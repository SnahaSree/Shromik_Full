import {
  AppError,
} from "../errors/AppError.js";

import {
  createAccessToken,
  createRefreshToken,
} from "../utils/tokens.js";

import {
  hashPassword,
  verifyPassword,
} from "../utils/password.js";

import {
  hashToken,
} from "../utils/tokenHash.js";

import {
  UserRepository,
} from "../repositories/UserRepository.js";

export class AuthService {
  private readonly userRepository =
    new UserRepository();

  async register(
    email: string,
    password: string,
    role:
      | "worker"
      | "contractor",
  ) {
    const existing =
      await this.userRepository.findOne({
        email,
      });

    if (existing) {
      throw new AppError(
        "An account with this email already exists",
        409,
        "EMAIL_ALREADY_EXISTS",
      );
    }

    const passwordHash =
      await hashPassword(password);

    const user =
      await this.userRepository.create({
        email,
        passwordHash,
        role,
        accountStatus: "pending",
        verificationStatus:
          "pending",
        failedLoginAttempts: 0,
      });

    return {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      accountStatus:
        user.accountStatus,
      verificationStatus:
        user.verificationStatus,
    };
  }

  async login(
    email: string,
    password: string,
  ) {
    const user =
      await this.userRepository.findByEmail(
        email,
      );

    if (!user) {
      throw new AppError(
        "Invalid email or password",
        401,
        "INVALID_CREDENTIALS",
      );
    }

    if (
      user.lockedUntil &&
      user.lockedUntil > new Date()
    ) {
      throw new AppError(
        "Account temporarily locked",
        423,
        "ACCOUNT_LOCKED",
      );
    }

    const passwordValid =
      await verifyPassword(
        user.passwordHash,
        password,
      );

    if (!passwordValid) {
      const attempts =
        user.failedLoginAttempts + 1;

      const update: Record<
        string,
        unknown
      > = {
        failedLoginAttempts:
          attempts,
      };

      if (attempts >= 5) {
        update.lockedUntil =
          new Date(
            Date.now() +
              15 * 60 * 1000,
          );
      }

      await this.userRepository.updateById(
        user._id.toString(),
        update,
      );

      throw new AppError(
        "Invalid email or password",
        401,
        "INVALID_CREDENTIALS",
      );
    }

    if (
      user.accountStatus ===
      "suspended"
    ) {
      throw new AppError(
        "Account is suspended",
        403,
        "ACCOUNT_SUSPENDED",
      );
    }

    if (
      user.accountStatus ===
      "deactivated"
    ) {
      throw new AppError(
        "Account is deactivated",
        403,
        "ACCOUNT_DEACTIVATED",
      );
    }

    const accessToken =
      createAccessToken(
        user._id.toString(),
        user.role,
      );

    const refreshToken =
      createRefreshToken(
        user._id.toString(),
      );

    await this.userRepository.updateById(
      user._id.toString(),
      {
        $set: {
          lastLoginAt: new Date(),
          failedLoginAttempts: 0,
          lockedUntil: undefined,
          refreshTokenHash:
            hashToken(refreshToken),
        },
      },
    );

    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
        accountStatus:
          user.accountStatus,
        verificationStatus:
          user.verificationStatus,
      },
      accessToken,
      refreshToken,
    };
  }

  async logout(
    userId: string,
  ): Promise<void> {
    await this.userRepository.updateById(
      userId,
      {
        $unset: {
          refreshTokenHash: 1,
        },
      },
    );
  }
}

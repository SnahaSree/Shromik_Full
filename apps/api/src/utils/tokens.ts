import jwt, {
  type SignOptions,
} from "jsonwebtoken";

import type {
  UserRole,
} from "../types/common.js";

import type {
  AccessTokenPayload,
  RefreshTokenPayload,
} from "../types/auth.js";

function getSecret(
  name: string,
): string {
  const value =
    process.env[name];

  if (!value) {
    throw new Error(
      `${name} is not configured`,
    );
  }

  return value;
}

function getExpiresIn(
  value: string | undefined,
  fallback: string,
): NonNullable<SignOptions["expiresIn"]> {
  return (
    value || fallback
  ) as NonNullable<SignOptions["expiresIn"]>;
}

export function createAccessToken(
  userId: string,
  role: UserRole,
): string {
  const payload: AccessTokenPayload = {
    sub: userId,
    role,
    type: "access",
  };

  return jwt.sign(
    payload,
    getSecret(
      "JWT_ACCESS_SECRET",
    ),
    {
      expiresIn: getExpiresIn(
        process.env
          .JWT_ACCESS_EXPIRES_IN,
        "15m",
      ),
    },
  );
}

export function createRefreshToken(
  userId: string,
): string {
  const payload: RefreshTokenPayload = {
    sub: userId,
    type: "refresh",
  };

  return jwt.sign(
    payload,
    getSecret(
      "JWT_REFRESH_SECRET",
    ),
    {
      expiresIn: getExpiresIn(
        process.env
          .JWT_REFRESH_EXPIRES_IN,
        "7d",
      ),
    },
  );
}

export function verifyAccessToken(
  token: string,
): AccessTokenPayload {
  const payload =
    jwt.verify(
      token,
      getSecret(
        "JWT_ACCESS_SECRET",
      ),
    );

  if (
    typeof payload !==
      "object" ||
    payload === null ||
    payload.type !==
      "access" ||
    typeof payload.sub !==
      "string"
  ) {
    throw new Error(
      "Invalid access token",
    );
  }

  return payload as AccessTokenPayload;
}

export function verifyRefreshToken(
  token: string,
): RefreshTokenPayload {
  const payload =
    jwt.verify(
      token,
      getSecret(
        "JWT_REFRESH_SECRET",
      ),
    );

  if (
    typeof payload !==
      "object" ||
    payload === null ||
    payload.type !==
      "refresh" ||
    typeof payload.sub !==
      "string"
  ) {
    throw new Error(
      "Invalid refresh token",
    );
  }

  return payload as RefreshTokenPayload;
}


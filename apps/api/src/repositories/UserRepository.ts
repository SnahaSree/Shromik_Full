import {
  User,
  type IUser,
} from "../models/User.js";

import {
  BaseRepository,
} from "./BaseRepository.js";

export class UserRepository
  extends BaseRepository<IUser>
{
  constructor() {
    super(User);
  }

  async findByEmail(
    email: string,
  ): Promise<IUser | null> {
    return User.findOne({
      email: email.toLowerCase(),
    })
      .select("+passwordHash")
      .exec();
  }

  async findByEmailWithAuthData(
    email: string,
  ): Promise<IUser | null> {
    return User.findOne({
      email: email.toLowerCase(),
    })
      .select(
        "+passwordHash +refreshTokenHash +passwordResetTokenHash +verificationTokenHash",
      )
      .exec();
  }

  async findByIdWithRefreshToken(
    id: string,
  ): Promise<IUser | null> {
    return User.findById(id)
      .select("+refreshTokenHash")
      .exec();
  }
}
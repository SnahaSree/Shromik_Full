import { User, type IUser } from "../models/User.js";
import { BaseRepository } from "./BaseRepository.js";

export class UserRepository extends BaseRepository<IUser> {
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

  async findByPhone(
    phone: string,
  ): Promise<IUser | null> {
    return User.findOne({
      phone,
    }).exec();
  }

  async findActiveUser(
    filter: Record<string, unknown>,
  ): Promise<IUser | null> {
    return User.findOne({
      ...filter,
      accountStatus: "active",
    }).exec();
  }
}
import type { Document, Model } from "mongoose";

export class BaseRepository<T extends Document> {
  constructor(
    protected readonly model: Model<T>,
  ) {}

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async findOne(
    filter: Record<string, unknown>,
  ): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  async create(
    data: Partial<T>,
  ): Promise<T> {
    return this.model.create(data);
  }

  async updateById(
    id: string,
    update: Record<string, unknown>,
  ): Promise<T | null> {
    return this.model
      .findByIdAndUpdate(id, update, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async deleteById(
    id: string,
  ): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
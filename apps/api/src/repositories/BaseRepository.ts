import type {
  Document,
  Model,
  QueryFilter,
  QueryOptions,
  UpdateQuery,
} from "mongoose";

export class BaseRepository<T extends Document> {
  constructor(
    protected readonly model: Model<T>,
  ) {}

  async findById(
    id: string,
  ): Promise<T | null> {
    return this.model
      .findById(id)
      .exec();
  }

  async findOne(
    filter: QueryFilter<T>,
  ): Promise<T | null> {
    return this.model
      .findOne(filter)
      .exec();
  }

  async findMany(
    filter: QueryFilter<T> = {},
  ): Promise<T[]> {
    return this.model
      .find(filter)
      .exec();
  }

  async findPaginated(
    filter: QueryFilter<T>,
    page: number,
    limit: number,
  ): Promise<{
    items: T[];
    total: number;
  }> {
    const skip = (page - 1) * limit;

    const [items, total] =
      await Promise.all([
        this.model
          .find(filter)
          .skip(skip)
          .limit(limit)
          .exec(),

        this.model
          .countDocuments(filter)
          .exec(),
      ]);

    return {
      items,
      total,
    };
  }

  async create(
    data: Partial<T>,
  ): Promise<T> {
    return this.model.create(data);
  }

  async updateById(
    id: string,
    update: UpdateQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<T | null> {
    return this.model
      .findByIdAndUpdate(
        id,
        update,
        {
          new: true,
          runValidators: true,
          ...options,
        },
      )
      .exec();
  }

  async deleteById(
    id: string,
  ): Promise<T | null> {
    return this.model
      .findByIdAndDelete(id)
      .exec();
  }

  async exists(
    filter: QueryFilter<T>,
  ): Promise<boolean> {
    const result =
      await this.model
        .exists(filter)
        .exec();

    return result !== null;
  }
}
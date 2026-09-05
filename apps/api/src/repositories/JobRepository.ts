import type { QueryFilter } from "mongoose";

import {
  Job,
  type IJob,
} from "../models/Job.js";

import { BaseRepository } from "./BaseRepository.js";

export class JobRepository
  extends BaseRepository<IJob>
{
  constructor() {
    super(Job);
  }

  async findOpenJobs(
    filter: QueryFilter<IJob> = {},
  ): Promise<IJob[]> {
    return Job.find({
      ...filter,
      status: "open",
    })
      .sort({
        createdAt: -1,
      })
      .exec();
  }

  async findOpenJobsPaginated(
    filter: QueryFilter<IJob>,
    page: number,
    limit: number,
  ) {
    return this.findPaginated(
      {
        ...filter,
        status: "open",
      },
      page,
      limit,
    );
  }
}
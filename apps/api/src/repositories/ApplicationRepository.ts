import {
  Application,
  type IApplication,
} from "../models/Application.js";

import { BaseRepository } from "./BaseRepository.js";

export class ApplicationRepository
  extends BaseRepository<IApplication>
{
  constructor() {
    super(Application);
  }

  async findByWorkerAndJob(
    workerId: string,
    jobId: string,
  ): Promise<IApplication | null> {
    return Application.findOne({
      workerId,
      jobId,
    }).exec();
  }

  async findWorkerApplications(
    workerId: string,
  ): Promise<IApplication[]> {
    return Application.find({
      workerId,
    })
      .sort({
        createdAt: -1,
      })
      .exec();
  }

  async findJobApplications(
    jobId: string,
  ): Promise<IApplication[]> {
    return Application.find({
      jobId,
    })
      .sort({
        createdAt: -1,
      })
      .exec();
  }
}
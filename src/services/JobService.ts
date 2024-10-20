import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import logger from "../config/logger";
import Job from "../models/Job";
import {collections} from "../config/database";

export class JobService {
    async getJobs(): Promise<Job[]> {
        try {
            if (collections.jobs) {
                const jobs = await collections.jobs.find({}).toArray();
                const typedJobs: Job[] = jobs.map(job => ({
                    id: job._id,
                    title: job.title,
                    description: job.description,
                }));
                logger.info(`JobService.getJobs retrieved jobs: ${JSON.stringify(typedJobs)}`);
                return typedJobs;
            } else {
                throw new Error("jobs = null || undefined");
            }
        } catch (error) {
            logger.error('Error fetching jobs:', error);
            throw new Error('Error fetching jobs');
        }
    }
}

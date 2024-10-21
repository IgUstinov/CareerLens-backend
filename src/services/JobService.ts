import logger from "../config/logger";
import Job from "../models/Job";
import {collections} from "../config/database";

export class JobService {
    async getJobs(): Promise<Job[]> {
        try {
            if (collections.jobs) {
                const jobs = await collections.jobs.find().toArray();
                console.log('jobs', jobs)
                const typedJobs: Job[] = jobs.map(job => ({
                    id: job._id,
                    name: job.name,
                    experience: job.experience.name,
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

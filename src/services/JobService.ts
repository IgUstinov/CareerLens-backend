import { Job } from '../types/Job';
import logger from "../config/logger";

export class JobService {
    async getJobs(): Promise<Job[]> {
        // Connect Database
        // Request to Database
        const jobs: Job[] = [ { id: 1, title: "Software Engineer", description: 'Develop software application' } ]
        logger.info(`JobService.getJobs return jobs[]: ${JSON.stringify(jobs)}`)
        return jobs;
    }
}
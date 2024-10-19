import { Job } from '../types/Job';
import logger from "../config/logger";

export class JobService {
    async getJobs(): Promise<Job[]> {
        // Connect Database
        // Request to Database
        const jobs: Job[] = [ { id: 1, title: "Software Engineer", description: 'Develop software application' } ]
        jobs.push( { id: 2, title: "NodeJS Developer", description: 'Develop backend on javascript' } )
        logger.info(`JobService.getJobs return jobs[]: ${JSON.stringify(jobs)}`)
        return jobs;
    }
}
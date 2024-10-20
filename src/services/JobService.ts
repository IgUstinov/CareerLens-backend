// src/services/JobService.ts
import JobModel from '../models/Job';
import { Job } from '../types/Job';
import logger from '../config/logger';

export class JobService {
    async getJobs(): Promise<Job[]> {
        try {
            // Получение всех записей из коллекции jobs
            const jobs = await JobModel.find();
            logger.info(`JobService.getJobs retrieved jobs: ${JSON.stringify(jobs)}`);
            return jobs;
        } catch (error) {
            logger.error('Error fetching jobs:', error);
            throw new Error('Error fetching jobs');
        }
    }
}

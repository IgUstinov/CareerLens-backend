import { Request, Response } from 'express';
import { JobService } from "../services/JobService";
import logger from "../config/logger";

class JobController {
    private jobService: JobService;

    constructor() {
        this.jobService = new JobService();
    }

    async getAllJobs(req: Request, res: Response): Promise<void> {
        try {
            const jobs = await this.jobService.getJobs();
            logger.info(`JobController.getAllJobs return jobs[]: ${JSON.stringify(jobs)}`)
            res.status(200).json(jobs);
        } catch (error: any) {
            logger.error(`JobController.getAllJobs error: ${JSON.stringify(error)}`)
            res.status(500).json({ message: error.message });
        }
    }
}

export default JobController;
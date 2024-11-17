import { Request, Response } from 'express';
import { JobService } from "../services/JobService";
import logger from "../config/logger";

class JobController {
    private jobService: JobService;

    constructor() {
        this.jobService = new JobService();
    }

    async refreshAreas(req: Request, res: Response): Promise<void> {
        try {
            const jobs = await this.jobService.refreshAreas();
            res.status(200).json(jobs);
        } catch (error: any) {
            logger.error(`JobController.refreshAreas error: ${JSON.stringify(error)}`)
            res.status(500).json({ message: error.message });
        }
    }

    async getAllAreas(req: Request, res: Response): Promise<void> {
        try {
            const areas = await this.jobService.getAllAreas();
            logger.info(`JobController.getAllAreas return areas[]: ${JSON.stringify(areas)}`)
            res.status(200).json(areas);
        } catch (error: any) {
            logger.error(`JobController.getAllAreas error: ${JSON.stringify(error)}`)
            res.status(500).json({ message: error.message });
        }
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

    async getJobsByFilter(req: Request, res: Response): Promise<void> {
        try {
            const jobs = await this.jobService.getJobsByFilter(req.body);
            res.status(200).json(jobs);
        } catch (error: any) {
            logger.error(`JobController.getJobsByFilter error: ${JSON.stringify(error)}`)
            res.status(500).json({ message: error.message });
        }
    }

    async refreshJobs(req: Request, res: Response): Promise<void> {
        try {
            const jobs = await this.jobService.refreshJobs();
            res.status(200).json(jobs);
        } catch (error: any) {
            logger.error(`JobController.refreshJobs error: ${JSON.stringify(error)}`)
            res.status(500).json({ message: error.message });
        }
    }
}

export default JobController;
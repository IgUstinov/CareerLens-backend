// tests/JobService.test.ts
import { JobService } from '../src/services/JobService';
import logger from "../src/config/logger";

describe('JobService', () => {
    let jobService: JobService;

    beforeAll(() => {
        jobService = new JobService();
    });

    it('should retrieve jobs successfully', async () => {
        const jobs = await jobService.getJobs(); // Предположим, этот метод возвращает список вакансий
        expect(jobs).toBeInstanceOf(Array);
        logger.info(`response body: ${JSON.stringify(jobs)}`);

        expect(jobs.length).toBeGreaterThan(0);
        logger.info(`response body length: ${jobs.length}`);
    });
});

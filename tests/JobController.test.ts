import request from 'supertest';
import app from '../src/app';
import logger from "../src/config/logger";

describe('JobController', () => {
    it('GET /api/jobs should return a list of jobs', async () => {
        const response = await request(app).get('/api/jobs');

        expect(response.status).toBe(200);
        logger.info(`response status: ${response.status}`);
        expect(response.body).toBeInstanceOf(Array);
        logger.info(`response body: ${JSON.stringify(response.body)}`);

        expect(response.body.length).toBeGreaterThan(0);
        logger.info(`response body length: ${response.body.length}`);

    });
});

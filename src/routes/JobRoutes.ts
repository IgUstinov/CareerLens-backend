import express from 'express';
import JobController from "../controllers/JobController";

const router = express.Router();
const jobController = new JobController();

router.get('/jobs', (req, res) => jobController.getAllJobs(req, res));

export default router;
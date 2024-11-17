import express from 'express';
import JobController from "../controllers/JobController";

const router = express.Router();
const jobController = new JobController();

router.get('/areas', (req, res) => jobController.getAllAreas(req, res));
router.get('/areas/refresh', (req, res) => jobController.refreshAreas(req, res));

router.get('/jobs', (req, res) => jobController.getAllJobs(req, res));
router.post('/jobs', (req, res) => jobController.getJobsByFilter(req, res));
router.get('/jobs/refresh', (req, res) => jobController.refreshJobs(req, res));

export default router;
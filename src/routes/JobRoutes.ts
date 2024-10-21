import express from 'express';
import JobController from "../controllers/JobController";
import KafkaController from "../controllers/KafkaController";

const router = express.Router();
const jobController = new JobController();
const kafkaController = new KafkaController();

router.get('/jobs', (req, res) => jobController.getAllJobs(req, res));
router.get('/kafka', (req, res) => kafkaController.send(req, res));

export default router;
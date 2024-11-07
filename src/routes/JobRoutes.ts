import express from 'express';
import JobController from "../controllers/JobController";
import KafkaController from "../controllers/KafkaController";

const router = express.Router();
const jobController = new JobController();
const kafkaController = new KafkaController();

router.get('/jobs', (req, res) => jobController.getAllJobs(req, res));
router.get('/kafka/all', (req, res) => kafkaController.sendAll(req, res));
router.get('/kafka/collect', (req, res) => kafkaController.sendCollect(req, res));
router.get('/kafka/filter', (req, res) => kafkaController.sendFilter(req, res));

export default router;
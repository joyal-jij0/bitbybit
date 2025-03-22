import express from "express";
import { initJob, getJob, getJobs } from "../controllers/job.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
const router = express.Router();

router.route('/').post(verifyJWT, initJob)
router.route('/:jobId').get(verifyJWT, getJob)
router.route('/').get(verifyJWT, getJobs)

export default router;

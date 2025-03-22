import express from "express";
import { initJob, getJob, getJobs, rejectJob, acceptJob, suggestJob, completeJob } from "../controllers/job.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
const router = express.Router();

router.route('/init').post(verifyJWT, initJob)
router.route('/get/:jobId').get(verifyJWT, getJob)
router.route('/getAll').get(verifyJWT, getJobs)

router.route('/reject/:jobId').put(verifyJWT, rejectJob)
router.route('/accept/:jobId').put(verifyJWT, acceptJob)
router.route('/suggest/:jobId').put(verifyJWT, suggestJob)
router.route('/complete/:jobId').put(verifyJWT, completeJob)

export default router;

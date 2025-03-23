import express from 'express';
import  { getMilestones, createMilestone, updateMilestone, deleteMilestone, submitMilestone, approveMilestone, rejectMilestone } from '../controllers/milestone.controller';
import { verifyJWT } from '../middlewares/auth.middleware';

const router = express.Router();


router.route('/get/:jobId').get(verifyJWT, getMilestones);
router.route('/create/:jobId').post(verifyJWT, createMilestone);
router.route('update/:milestoneId').put(verifyJWT, updateMilestone);
router.route('delete/:milestoneId').delete(verifyJWT, deleteMilestone);

router.route('submit/:milestoneId').put(verifyJWT, submitMilestone);
router.route('approve/:milestoneId').put(verifyJWT, approveMilestone);
router.route('reject/:milestoneId').put(verifyJWT, rejectMilestone);

export default router;
import express from 'express';
import  { getMilestones, createMilestone, updateMilestone, deleteMilestone } from '../controllers/milestone.controller';
import { verifyJWT } from '../middlewares/auth.middleware';

const router = express.Router();


router.route('/').get(verifyJWT, getMilestones);
router.route('/').post(verifyJWT, createMilestone);
router.route('/:milestoneId').put(verifyJWT, updateMilestone);
router.route('/:milestoneId').delete(verifyJWT, deleteMilestone);

export default router;
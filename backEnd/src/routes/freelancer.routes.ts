import express from "express";
import { 
    createFreelancerProfile, 
    updateFreelancerProfile, 
    getFreelancerProfile 
} from "../controllers/profile.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = express.Router();

router.route('/:userId').get(verifyJWT, getFreelancerProfile);
router.route('/').post(verifyJWT, createFreelancerProfile);
router.route('/').put(verifyJWT, updateFreelancerProfile);

export default router;

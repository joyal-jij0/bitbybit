import express from "express";
import { 
    createFreelancerProfile, 
    updateFreelancerProfile, 
    getFreelancerProfile,
    getAllFreelancers
} from "../controllers/profile.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = express.Router();

router.route('/:userId').get(verifyJWT, getFreelancerProfile);
router.route('/').post(verifyJWT, createFreelancerProfile);
router.route('/').put(verifyJWT, updateFreelancerProfile);
router.route('/getAll').get(verifyJWT, getAllFreelancers)

export default router;

import express from "express";
import { 
    createFreelancerProfile, 
    updateFreelancerProfile, 
    getFreelancerProfile,
    getAllFreelancers
} from "../controllers/profile.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = express.Router();


router.route('/').post(verifyJWT, createFreelancerProfile);
router.route('/').put(verifyJWT, updateFreelancerProfile);
router.route('/getAll').get(verifyJWT, getAllFreelancers)
router.route('/:userId').get(verifyJWT, getFreelancerProfile);

export default router;

import express from "express";
import { 
    createClientProfile, 
    updateClientProfile, 
    getClientProfile 
} from "../controllers/profile.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", createClientProfile);
router.put("/", updateClientProfile);
router.get("/:userId", getClientProfile);

router.route('/').get(verifyJWT, createClientProfile);
router.route('/').post(verifyJWT, updateClientProfile);
router.route('/:userId').get(verifyJWT, getClientProfile);

export default router;

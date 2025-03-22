import express from "express";
import { generateProjectProposalController } from "../controllers/ai.controller";

const router = express.Router();

router.post("/generate_project_proposal", generateProjectProposalController);

export default router;
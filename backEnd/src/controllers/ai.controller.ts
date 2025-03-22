import { generateProjectProposal } from "../utils/AiHelper";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Response, Request } from "express";

export const generateProjectProposalController = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required and must be a string" });
    }

    const projectProposal = await generateProjectProposal(message);
    
    return res.status(200).json(
        new ApiResponse({
        statusCode: 200,
        data: projectProposal
      }));
  } catch (error) {
    return res.status(500).json(
        new ApiResponse({ 
            statusCode: 500,
            data: {
                "message": "Failed to generate project proposal"
            } 
    }));
  }
});
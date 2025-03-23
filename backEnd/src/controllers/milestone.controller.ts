import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Response, Request } from "express";
import { prisma } from "..";
import jwt, {JwtPayload} from 'jsonwebtoken'

const getMilestones = asyncHandler(async (req: Request, res: Response) => {
    const { jobId } = req.params;
    const milestones = await prisma.milestone.findMany({
        where: {
            jobId,
        },
    });

    return res.status(201).json(
        new ApiResponse({
            statusCode: 201,
            data: milestones,
        })
    );
});

const createMilestone = asyncHandler(async (req: Request, res: Response) => {
    const { jobId } = req.params;
    const { description, title, dueDate, amount, job } = req.body;
    const milestone = await prisma.milestone.create({
        data: {
            description,
            title,
            dueDate,
            amount,
            job,
            jobId,
        },
    });

    return res.status(201).json(
        new ApiResponse({
            statusCode: 201,
            data: milestone,
            message: "Milestone created",
        })
    );
});

const updateMilestone = asyncHandler(async (req: Request, res: Response) => {
    const { milestoneId } = req.params;
    const { description, amount } = req.body;
    const milestone = await prisma.milestone.update({
        where: {
            id: milestoneId,
        },
        data: {
            description,
            amount,
        },
    });

    return res.status(201).json(
        new ApiResponse({
            statusCode: 201,
            data: milestone,
            message: "Milestone updated",
        })
    );
});

const deleteMilestone = asyncHandler(async (req: Request, res: Response) => {
    const { milestoneId } = req.params;
    await prisma.milestone.delete({
        where: {
            id: milestoneId,
        },
    });

    return res.status(201).json(
        new ApiResponse({
            statusCode: 201,
            data: null,
            message: "Milestone deleted",
        })
    );
});

const submitMilestone = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req.user as JwtPayload).userId;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                freelancer: true,
            }
        })

        if (!user?.freelancer) {
            return res.status(400).json(
                new ApiResponse({
                    statusCode: 400,
                    data: null,
                    message: "User is not a freelancer",
                })
            );
        }

        const { milestoneId, files, comments } = req.params;
        await prisma.workSubmission.create({
            data: {
                milestoneId,
                files,
                comments,
                freelancerId: user.freelancer.id,
                updatedAt: new Date(),
            },
        })
    
        return res.status(201).json(
            new ApiResponse({
                statusCode: 201,
                data: null,
                message: "Milestone submitted",
            })
        );
    } catch (error) {
        return res.status(500).json(
            new ApiResponse({
                statusCode: 500,
                data: null,
                message: "Error submitting milestone",
            })
        )
    }
})

const approveMilestone = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req.user as JwtPayload).userId;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                client: true,
            }
        })

        if (!user?.client) {
            return res.status(400).json(
                new ApiResponse({
                    statusCode: 400,
                    data: null,
                    message: "Unauthorized",
                })
            );
        }

        const { milestoneId } = req.params;
        await prisma.workSubmission.update({
            where: {
                id: milestoneId,
            },
            data: {
                status: 'APPROVED',
            },
        })
    
        return res.status(201).json(
            new ApiResponse({
                statusCode: 201,
                data: null,
                message: "Milestone approved",
            })
        );
    } catch (error) {
        return res.status(500).json(
            new ApiResponse({
                statusCode: 500,
                data: null,
                message: "Error approving milestone",
            })
        )
    }
})

const rejectMilestone = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req.user as JwtPayload).userId;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                client: true,
            }
        })

        if (!user?.client) {
            return res.status(400).json(
                new ApiResponse({
                    statusCode: 400,
                    data: null,
                    message: "Unauthorized",
                })
            );
        }

        const { milestoneId } = req.params;
        await prisma.workSubmission.update({
            where: {
                id: milestoneId,
            },
            data: {
                status: 'REJECTED',
            },
        })
    
        return res.status(201).json(
            new ApiResponse({
                statusCode: 201,
                data: null,
                message: "Milestone rejected",
            })
        );
    } catch (error) {
        return res.status(500).json(
            new ApiResponse({
                statusCode: 500,
                data: null,
                message: "Error rejecting milestone",
            })
        )
    }
})
export  { getMilestones, createMilestone, updateMilestone, deleteMilestone, submitMilestone, approveMilestone, rejectMilestone };

import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Response, Request } from "express";
import jwt, {JwtPayload} from 'jsonwebtoken'
import { prisma } from "..";


const initJob = asyncHandler(async (req: Request, res: Response) => {
    // model Job {
    //     id           String      @id @default(uuid())
    //     title        String
    //     description  String
    //     clientId     String
    //     freelancerId String?
    //     createdAt    DateTime    @default(now())
    //     updatedAt    DateTime    @updatedAt
    //     milestones   Milestone[]
    //     client       Client      @relation("ClientJobs", fields: [clientId], references: [id])
    //     freelancer   Freelancer? @relation("FreelancerJobs", fields: [freelancerId], references: [id])
    //     Dispute      Dispute[]
    //   }

    const { title, description, freelancerId, milestones } = req.body;
    const clientId = (req.user as JwtPayload).userId;

    const job = await prisma.job.create({
        data: {
            title,
            description,
            clientId,
            freelancerId,
        },
    });

    milestones.forEach(async (milestone:any) => {
        await prisma.milestone.create({
            data: {
                ...milestone,
                jobId: job.id,
            },
        });
    });
    
})

const getJob = asyncHandler(async (req: Request, res: Response) => {
    const { jobId } = req.params;
    const job = await prisma.job.findUnique({
        where: {
            id: jobId,
        },
        include: {
            milestones: true,
        },
    });

    return res.status(201).json(
        new ApiResponse({
            statusCode: 201,
            data: job,
            message: "Job fetched",
        })
    )
})

const getJobs = asyncHandler(async (req: Request, res: Response) => {
    const jobs = await prisma.job.findMany({
        include: {
            milestones: true,
        },
    });

    return res.status(201).json(
        new ApiResponse({
            statusCode: 201,
            data: jobs,
            message: "Jobs fetched",
        })
    )
})

export { initJob, getJob, getJobs };
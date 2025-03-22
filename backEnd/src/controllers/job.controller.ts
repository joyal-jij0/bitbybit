import { ApiResponse } from "../utils/ApiResponse" 
import { asyncHandler } from "../utils/asyncHandler" 
import { Response, Request } from "express" 

import jwt, { JwtPayload } from 'jsonwebtoken'
import { prisma } from ".." 


const initJob = asyncHandler(async (req: Request, res: Response) => {

    const { title, description, freelancerId, milestones } = req.body 
    const clientId = (req.user as JwtPayload).userId 

    try {
        const job = await prisma.job.create({
            data: {
                title,
                description,
                clientId,
                freelancerId,
                updatedAt: new Date(),
            },
        }) 

        milestones.forEach(async (milestone: any) => {
            await prisma.milestone.create({
                data: {
                    ...milestone,
                    jobId: job.id,
                },
            }) 
        }) 

        return res.status(201).json(
            new ApiResponse({
                statusCode: 201,
                data: job,
                message: "Job created",
            })
        ) 

    } catch (error) {
        return res.status(400).json(
            new ApiResponse({
                statusCode: 400,
                data: null,
                message: "Error creating job",
            })
        ) 

    }

})

const getJob = asyncHandler(async (req: Request, res: Response) => {
    const { jobId } = req.params 
    const job = await prisma.job.findUnique({
        where: {
            id: jobId,
        },
        include: {
            milestones: true,
        },
    }) 

    return res.status(201).json(
        new ApiResponse({
            statusCode: 201,
            data: job,
            message: "Job fetched",
        })
    )
})

const getJobs = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req.user as JwtPayload).userId 
    try {
        const jobs = await prisma.job.findMany({
            where: {
                OR: [
                    {
                        clientId: userId,
                    },
                    {
                        freelancerId: userId,
                    },
                ],
            },
            include: {
                milestones: true,
            },
        }) 

        return res.status(201).json(
            new ApiResponse({
                statusCode: 201,
                data: jobs,
                message: "Jobs fetched",
            })
        )
    } catch (error) {
        return res.status(500).json(
            new ApiResponse({
                statusCode: 500,
                data: null,
                message: "Error fetching jobs",
            })
        )
    }
})

const rejectJob = asyncHandler(async (req: Request, res: Response) => {

    const { jobId } = req.params
    const { rejectReason } = req.body

    try {
        const job = await prisma.job.findUnique({
            where: {
                id: jobId,
            },
        })

        const userId = (req.user as JwtPayload).userId 

        if ((job?.clientId !== userId) || (job?.freelancerId !== userId)) {
            return res.status(403).json(
                new ApiResponse({
                    statusCode: 403,
                    data: null,
                    message: "Unauthorized",
                })
            )
        }

        await prisma.job.update({
            where: {
                id: jobId,
            },
            data: {
                isRejected: true,
                rejectReason: rejectReason
            },
        })
    } catch (error) {
        return res.status(500).json(
            new ApiResponse({
                statusCode: 500,
                data: null,
                message: "Error rejecting job",
            })
        )
    }

})

const acceptJob = asyncHandler(async (req: Request, res: Response) => {
    const { jobId } = req.params

    try {
        const job = await prisma.job.findUnique({
            where: {
                id: jobId,
            },
        })

        const userId = (req.user as JwtPayload).userId 

        if ((job?.clientId !== userId) || (job?.freelancerId !== userId)) {
            return res.status(403).json(
                new ApiResponse({
                    statusCode: 403,
                    data: null,
                    message: "Unauthorized",
                })
            )
        }

        await prisma.job.update({
            where: {
                id: jobId,
            },
            data: {
                isAccepted: true,
            },
        })
    } catch (error) {
        return res.status(500).json(
            new ApiResponse({
                statusCode: 500,
                data: null,
                message: "Error accepting job",
            })
        )
    }
})

const suggestJob = asyncHandler(async (req: Request, res: Response) => {
    
    const { title, description, freelancerId, clientId, milestones } = req.body
    const userId = (req.user as JwtPayload).userId

    const user = await prisma.user.findUnique({
         where: { id: userId },
         include: { client: true, freelancer: true }
        })

    const userType = user?.client ? 'client' : 'freelancer'

    try {
        const job = await prisma.job.create({
            data: {
                title,
                description,
                clientId: userType === 'client' ? userId : clientId,
                freelancerId: userType === 'freelancer' ? userId : freelancerId,
                updatedAt: new Date(),
            },
        })

        milestones.forEach(async (milestone: any) => {
            await prisma.milestone.create({
                data: {
                    ...milestone,
                    jobId: job.id,
                },
            })
        })

        return res.status(201).json(
            new ApiResponse({
                statusCode: 201,
                data: job,
                message: "Job created",
            })
        ) 
    } catch (error) {
        return res.status(500).json(
            new ApiResponse({
                statusCode: 500,
                data: null,
                message: "Error creating job",
            })
        )
    }
})

const completeJob = asyncHandler(async (req: Request, res: Response) => {
    const { jobId } = req.params

    try {
        const job = await prisma.job.findUnique({
            where: {
                id: jobId,
            },
        })

        const userId = (req.user as JwtPayload).userId 

        if (job?.clientId !== userId) {
            return res.status(403).json(
                new ApiResponse({
                    statusCode: 403,
                    data: null,
                    message: "Unauthorized",
                })
            )
        }

        await prisma.job.update({
            where: {
                id: jobId,
            },
            data: {
                isAccepted: true,
                acceptedAt: new Date(),
            },
        })
    } catch (error) {
        return res.status(500).json(
            new ApiResponse({
                statusCode: 500,
                data: null,
                message: "Error completing job",
            })
        )
    }
})

export { initJob, getJob, getJobs, rejectJob, acceptJob, suggestJob, completeJob }
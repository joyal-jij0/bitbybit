import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { prisma } from "..";
import jwt, { JwtPayload } from "jsonwebtoken";

const createClientProfile = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("🔹 CREATE CLIENT PROFILE - Starting");
    console.log("Request body:", req.body);

    const { headline, bio, location } = req.body;
    console.log("Extracted fields:", { headline, bio, location });

    try {
      const userId = (req.user as JwtPayload)?.userId;
      console.log("User ID from token:", userId);

      if (!userId) {
        console.error("❌ User ID missing from token");
        return res.status(401).json(
          new ApiResponse({
            statusCode: 401,
            data: null,
            message: "Authentication failed. User ID not found.",
          })
        );
      }

      console.log("🔸 Attempting to create client profile in database");
      const client = await prisma.client.create({
        data: { userId, headline, bio, location },
      });
      console.log("✅ Client profile created successfully:", client);

      return res.status(201).json(
        new ApiResponse({
          statusCode: 201,
          data: client,
          message: "Client profile created successfully.",
        })
      );
    } catch (error: any) {
      console.error("❌ Error creating client profile:", error);
      console.error("Error message:", error.message);
      console.error("Error code:", error.code);

      if (error.code === "P2002") {
        console.log(
          "🔶 Profile already exists for this user (unique constraint violation)"
        );
      }

      return res.status(409).json(
        new ApiResponse({
          statusCode: 409,
          data: null,
          message: "Client profile already exists.",
        })
      );
    }
  }
);

const updateClientProfile = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("🔹 UPDATE CLIENT PROFILE - Starting");
    console.log("Request body:", req.body);

    const { headline, bio, location } = req.body;
    console.log("Extracted fields:", { headline, bio, location });

    try {
      const userId = (req.user as JwtPayload)?.userId;
      console.log("User ID from token:", userId);

      if (!userId) {
        console.error("❌ User ID missing from token");
        return res.status(401).json(
          new ApiResponse({
            statusCode: 401,
            data: null,
            message: "Authentication failed. User ID not found.",
          })
        );
      }

      // Check if client profile exists first
      console.log("🔸 Checking if client profile exists for user ID:", userId);
      const existingProfile = await prisma.client.findUnique({
        where: { userId },
      });

      if (!existingProfile) {
        console.log("🔶 Client profile not found, creating a new one instead");
        // Create new profile if it doesn't exist
        const client = await prisma.client.create({
          data: { userId, headline, bio, location },
        });
        console.log("✅ Client profile created successfully:", client);

        return res.status(201).json(
          new ApiResponse({
            statusCode: 201,
            data: client,
            message: "Client profile created successfully.",
          })
        );
      }

      // Update existing profile
      console.log("🔸 Client profile found, updating it now");
      const client = await prisma.client.update({
        where: { userId },
        data: { headline, bio, location },
      });
      console.log("✅ Client profile updated successfully:", client);

      return res.status(200).json(
        new ApiResponse({
          statusCode: 200,
          data: client,
          message: "Client profile updated successfully.",
        })
      );
    } catch (error: any) {
      console.error("❌ Error updating client profile:", error);
      console.error("Error message:", error.message);
      console.error("Error code:", error.code);

      return res.status(500).json(
        new ApiResponse({
          statusCode: 500,
          data: null,
          message: "Failed to update client profile.",
        })
      );
    }
  }
);

const getClientProfile = asyncHandler(async (req: Request, res: Response) => {
  console.log("🔹 GET CLIENT PROFILE - Starting");
  console.log("Request params:", req.params);

  const { userId } = req.params;
  console.log("User ID from params:", userId);

  if (!userId) {
    console.log("❌ No user ID provided in request");
    return res.status(400).json(
      new ApiResponse({
        statusCode: 400,
        data: null,
        message: "User ID is required.",
      })
    );
  }

  try {
    console.log("🔸 Looking up client profile for user ID:", userId);
    const client = await prisma.client.findUnique({
      where: { userId },
      include: { user: true, projects: true },
    });

    if (!client) {
      console.log("❓ Client profile not found for user ID:", userId);
      return res.status(404).json(
        new ApiResponse({
          statusCode: 404,
          data: null,
          message: "Client profile not found.",
        })
      );
    }

    console.log("✅ Client profile retrieved successfully");
    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        data: client,
        message: "Client profile retrieved successfully.",
      })
    );
  } catch (error: any) {
    console.error("❌ Error retrieving client profile:", error);
    console.error("Error message:", error.message);
    return res.status(500).json(
      new ApiResponse({
        statusCode: 500,
        data: null,
        message: "Failed to retrieve client profile.",
      })
    );
  }
});

const createFreelancerProfile = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("🔹 CREATE FREELANCER PROFILE - Starting");
    console.log("Request body:", req.body);

    const { skills, portfolioUrl, headline, bio, location, rate } = req.body;
    console.log("Extracted fields:", {
      skills,
      portfolioUrl,
      headline,
      bio,
      location,
      rate,
    });

    try {
      const userId = (req.user as JwtPayload)?.userId;
      console.log("User ID from token:", userId);

      if (!userId) {
        console.error("❌ User ID missing from token");
        return res.status(401).json(
          new ApiResponse({
            statusCode: 401,
            data: null,
            message: "Authentication failed. User ID not found.",
          })
        );
      }

      // Validate skills array
      if (
        !Array.isArray(skills) ||
        skills.some((skill) => typeof skill !== "string")
      ) {
        console.log("❌ Invalid skills format:", skills);
        return res.status(400).json(
          new ApiResponse({
            statusCode: 400,
            data: null,
            message: "Skills must be an array of strings.",
          })
        );
      }

      // Validate portfolioUrl
      if (portfolioUrl && typeof portfolioUrl !== "string") {
        console.log("❌ Invalid portfolioUrl format:", portfolioUrl);
        return res.status(400).json(
          new ApiResponse({
            statusCode: 400,
            data: null,
            message: "Portfolio URL must be a string.",
          })
        );
      }

      console.log("🔸 Checking if user exists:", userId);
      const userExists = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!userExists) {
        console.log("❌ User not found with ID:", userId);
        return res.status(404).json(
          new ApiResponse({
            statusCode: 404,
            data: null,
            message: "User not found.",
          })
        );
      }
      console.log("✓ User found:", userExists);

      console.log("🔸 Attempting to create freelancer profile in database");
      const freelancer = await prisma.freelancer.create({
        data: { userId, skills, portfolioUrl, headline, bio, location, rate },
      });
      console.log("✅ Freelancer profile created successfully:", freelancer);

      return res.status(201).json(
        new ApiResponse({
          statusCode: 201,
          data: freelancer,
          message: "Freelancer profile created successfully.",
        })
      );
    } catch (error: any) {
      console.error("❌ Error creating freelancer profile:", error);
      console.error("Error message:", error.message);
      console.error("Error code:", error.code);

      if (error.code === "P2002") {
        console.log(
          "🔶 Profile already exists for this user (unique constraint violation)"
        );
      }

      return res.status(409).json(
        new ApiResponse({
          statusCode: 409,
          data: null,
          message: "Freelancer profile already exists.",
        })
      );
    }
  }
);

const updateFreelancerProfile = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("🔹 UPDATE FREELANCER PROFILE - Starting");
    console.log("Request body:", req.body);

    const { skills, portfolioUrl, headline, bio, location, rate } = req.body;
    console.log("Extracted fields:", {
      skills,
      portfolioUrl,
      headline,
      bio,
      location,
      rate,
    });

    try {
      const userId = (req.user as JwtPayload)?.userId;
      console.log("User ID from token:", userId);

      if (!userId) {
        console.error("❌ User ID missing from token");
        return res.status(401).json(
          new ApiResponse({
            statusCode: 401,
            data: null,
            message: "Authentication failed. User ID not found.",
          })
        )
      }

      console.log("🔸 Attempting to update freelancer profile in database");
      const freelancer = await prisma.freelancer.update({
        where: { userId },
        data: { skills, portfolioUrl, headline, bio, location, rate },
      });
      console.log("✅ Freelancer profile updated successfully:", freelancer);

      return res.status(200).json(
        new ApiResponse({
          statusCode: 200,
          data: freelancer,
          message: "Freelancer profile updated successfully.",
        })
      )
    } catch (error: any) {
      console.error("❌ Error updating freelancer profile:", error);
      console.error("Error message:", error.message);
      console.error("Error code:", error.code);

      if (error.code === "P2025") {
        console.log("🔶 Profile not found for this user");
        return res.status(404).json(
          new ApiResponse({
            statusCode: 404,
            data: null,
            message: "Freelancer profile not found.",
          })
        )
      }

      return res.status(500).json(
        new ApiResponse({
          statusCode: 500,
          data: null,
          message: "Failed to update freelancer profile.",
        })
      )
    }
  }
)

const getFreelancerProfile = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("🔹 GET FREELANCER PROFILE - Starting");
    console.log("Request params:", req.params);

    const { userId } = req.params;
    console.log("User ID from params:", userId);

    if (!userId) {
      console.log("❌ No user ID provided in request");
      return res.status(400).json(
        new ApiResponse({
          statusCode: 400,
          data: null,
          message: "User ID is required.",
        })
      )
    }

    try {
      console.log("🔸 Looking up freelancer profile for user ID:", userId);
      const freelancer = await prisma.freelancer.findUnique({
        where: { userId },
        include: { user: true, jobs: true },
      })

      if (!freelancer) {
        console.log("❓ Freelancer profile not found for user ID:", userId);
        return res.status(404).json(
          new ApiResponse({
            statusCode: 404,
            data: null,
            message: "Freelancer profile not found.",
          })
        )
      }

      console.log("✅ Freelancer profile retrieved successfully");
      return res.status(200).json(
        new ApiResponse({
          statusCode: 200,
          data: freelancer,
          message: "Freelancer profile retrieved successfully.",
        })
      )
    } catch (error: any) {
      console.error("❌ Error retrieving freelancer profile:", error);
      console.error("Error message:", error.message);
      return res.status(500).json(
        new ApiResponse({
          statusCode: 500,
          data: null,
          message: "Failed to retrieve freelancer profile.",
        })
      )
    }
  }
)

const getAllFreelancers = asyncHandler(async (req: Request, res: Response) => {

  try {
    const freelancers = await prisma.freelancer.findMany({
      include: { user: true },
    })

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        data: freelancers,
        message: "Freelancers retrieved successfully.",
      })
    )
  } catch (error: any) {
    return res.status(500).json(
      new ApiResponse({
        statusCode: 500,
        data: null,
        message: "Failed to retrieve freelancers.",
      })
    );
  }
})

export {
  createClientProfile,
  updateClientProfile,
  getClientProfile,
  createFreelancerProfile,
  updateFreelancerProfile,
  getFreelancerProfile,
  getAllFreelancers,
};

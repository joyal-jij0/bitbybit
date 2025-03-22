import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const verifyJWT = asyncHandler(
  async (req: AuthenticatedRequest, _: Response, next: NextFunction) => {
    console.log("🔒 JWT verification middleware triggered");
    console.log("Request headers:", req.headers);

    try {
      const authHeader = req.header("Authorization");
      console.log("Authorization header:", authHeader);

      const token = authHeader?.replace("Bearer ", "");
      console.log(
        "Extracted token:",
        token ? `${token.substring(0, 15)}...` : "No token found"
      );

      if (!token) {
        console.log("❌ No token provided in Authorization header");
        throw new ApiError(401, "Unauthorized request");
      }

      console.log(
        "🔑 Verifying token with secret:",
        process.env.ACCESS_TOKEN_SECRET ? "Secret exists" : "SECRET NOT FOUND"
      );

      const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!
      ) as JwtPayload;

      console.log("✅ Token verified successfully");
      console.log("Decoded token payload:", {
        userId: decodedToken.userId,
        exp: decodedToken.exp
          ? new Date(decodedToken.exp * 1000).toISOString()
          : "No expiration",
        iat: decodedToken.iat
          ? new Date(decodedToken.iat * 1000).toISOString()
          : "No issue date",
      });

      req.user = decodedToken;
      console.log("User object attached to request:", req.user);

      console.log(
        "✅ JWT verification successful, proceeding to next middleware/controller"
      );
      next();
    } catch (error: any) {
      console.error("❌ JWT verification failed:", error.message);
      console.error("Error details:", error);

      if (error.name === "TokenExpiredError") {
        console.log(
          "Token expired at:",
          new Date(error.expiredAt).toISOString()
        );
        throw new ApiError(401, "Token has expired");
      } else if (error.name === "JsonWebTokenError") {
        console.log("JWT Error:", error.message);
        throw new ApiError(401, "Invalid token");
      }

      throw new ApiError(401, "Invalid or expired token");
    }
  }
);

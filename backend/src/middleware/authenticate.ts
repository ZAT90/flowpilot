import type { NextFunction, Request, Response } from "express";

import { verifyAccessToken } from "../lib/jwt";
import { prisma } from "../lib/prisma";

export const authenticate = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader?.startsWith("Bearer ")) {
    response.status(401).json({
      message: "Authentication required",
    });
    return;
  }

  const token = authorizationHeader.replace("Bearer ", "").trim();

  try {
    const payload = verifyAccessToken(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      response.status(401).json({
        message: "User for token no longer exists",
      });
      return;
    }

    request.user = user;
    next();
  } catch {
    response.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

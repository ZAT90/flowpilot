import { Router } from "express";

import { authRouter } from "../features/auth/auth.routes";
import { workspaceRouter } from "../features/workspaces/workspace.routes";
import { healthRouter } from "./health";

export const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/workspaces", workspaceRouter);

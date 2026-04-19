import { Router } from "express";
import { authenticate } from "../../middleware/authenticate";
import { validateRequest } from "../../middleware/validate-request";
import { createWorkspaceSchema } from "./workspace.schemas";
import { createWorkspace, listWorkspaces } from "./workspace.service";

export const workspaceRouter = Router();

workspaceRouter.post(
  "/",
  authenticate,
  validateRequest(createWorkspaceSchema),
  async (request, response) => {
    const result = await createWorkspace(request.body);

    return response.status(result.status).json(result.body);
  },
);

workspaceRouter.get("/", authenticate, async (request, response) => {
  const result = await listWorkspaces();

  return response.status(result.status).json(result.body);
});

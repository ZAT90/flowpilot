import { prisma } from "../../lib/prisma";

type CreateWorkspaceInput = {
  name: string;
  slug: string;
};

export const createWorkspace = async (workspaceInput: CreateWorkspaceInput) => {
  const existingWorkspace = await prisma.workspace.findUnique({
    where: { slug: workspaceInput.slug },
    select: { id: true },
  });
  if (existingWorkspace) {
    return {
      status: 409 as const,
      body: { message: "A workspace with that slug already exists" },
    };
  }

  const workspaceToCreate = await prisma.workspace.create({
    data: {
      name: workspaceInput.name,
      slug: workspaceInput.slug,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return {
    status: 201 as const,
    body: { workspace: workspaceToCreate },
  };
};

export const listWorkspaces = async () => {
  const workspaceList = await prisma.workspace.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    status: 200 as const,
    body: { workspaces: workspaceList },
  };
};

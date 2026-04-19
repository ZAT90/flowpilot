import bcrypt from "bcrypt";

import { env } from "../../config/env";
import { signAccessToken } from "../../lib/jwt";
import { prisma } from "../../lib/prisma";

type SignupInput = {
  name?: string;
  email: string;
  password: string;
};

type LoginInput = {
  email: string;
  password: string;
};

type UserObj = {
  id: string;
  name: string | null;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

function buildAuthResponse(user: UserObj) {
  return {
    user,
    token: signAccessToken({
      sub: user.id,
      email: user.email,
    }),
  };
}

export async function signup(input: SignupInput) {
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email },
    select: { id: true },
  });

  if (existingUser) {
    return {
      status: 409 as const,
      body: {
        message: "An account with that email already exists",
      },
    };
  }

  const passwordHash = await bcrypt.hash(
    input.password,
    env.BCRYPT_SALT_ROUNDS,
  );

  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      passwordHash,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return {
    status: 201 as const,
    body: buildAuthResponse(user),
  };
}

export async function login(input: LoginInput) {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
    select: {
      id: true,
      name: true,
      email: true,
      passwordHash: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    return {
      status: 401 as const,
      body: {
        message: "Invalid email or password",
      },
    };
  }

  const isPasswordValid = await bcrypt.compare(
    input.password,
    user.passwordHash,
  );

  if (!isPasswordValid) {
    return {
      status: 401 as const,
      body: {
        message: "Invalid email or password",
      },
    };
  }

  return {
    status: 200 as const,
    body: buildAuthResponse({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }),
  };
}

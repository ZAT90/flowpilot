import type { User } from '@prisma/client';

type AuthenticatedUser = Pick<User, 'id' | 'name' | 'email' | 'createdAt' | 'updatedAt'>;

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export {};

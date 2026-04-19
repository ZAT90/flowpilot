import jwt, { type SignOptions } from 'jsonwebtoken';

import { env } from '../config/env';

type AuthTokenPayload = {
  sub: string;
  email: string;
};

export function signAccessToken(payload: AuthTokenPayload) {
  const signOptions: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
  };

  return jwt.sign(payload, env.JWT_SECRET, {
    ...signOptions,
  });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET) as AuthTokenPayload;
}

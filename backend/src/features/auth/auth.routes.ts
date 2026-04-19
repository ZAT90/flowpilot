import { Router } from 'express';

import { authenticate } from '../../middleware/authenticate';
import { validateRequest } from '../../middleware/validate-request';
import { loginSchema, signupSchema } from './auth.schemas';
import { login, signup } from './auth.service';

export const authRouter = Router();

authRouter.post('/signup', validateRequest(signupSchema), async (request, response) => {
  const result = await signup(request.body);

  response.status(result.status).json(result.body);
});

authRouter.post('/login', validateRequest(loginSchema), async (request, response) => {
  const result = await login(request.body);

  response.status(result.status).json(result.body);
});

authRouter.get('/me', authenticate, (request, response) => {
  response.status(200).json({
    user: request.user,
  });
});

import type { NextFunction, Request, Response } from 'express';
import type { AnyZodObject } from 'zod';

export function validateRequest(schema: AnyZodObject) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync({
      body: request.body,
      params: request.params,
      query: request.query,
    });

    if (!result.success) {
      response.status(400).json({
        message: 'Validation failed',
        errors: result.error.flatten(),
      });
      return;
    }

    // Express request.query is not writable in this setup, so we only
    // replace the parsed body for now. Params/query can still be validated
    // without being reassigned onto the request object.
    request.body = result.data.body;

    next();
  };
}

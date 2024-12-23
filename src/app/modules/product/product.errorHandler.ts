import { ZodError } from 'zod';
import process from 'process';

interface ValidationError {
  message: string;
  name: string;
  properties: {
    message: string;
    type: string;
  };
  kind: string;
  path: string;
  value: any;
}

interface ValidationErrors {
  [key: string]: ValidationError;
}

export const handleValidationError = (error: ZodError) => {
  const validationErrors = error.errors.reduce<ValidationErrors>(
    (acc, curr) => {
      const path = curr.path.join('.');
      acc[path] = {
        message: curr.message,
        name: 'ValidatorError',
        properties: {
          message: curr.message,
          type: curr.code,
        },
        kind: curr.code,
        path,
        value: curr.code,
      };
      return acc;
    },
    {},
  );

  return {
    message: 'Validation failed',
    success: false,
    error: {
      name: 'ValidationError',
      errors: validationErrors,
    },
    stack: process.env.NODE_ENV === 'development' && error.stack,
  };
};

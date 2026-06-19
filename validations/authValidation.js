import { z } from 'zod';
import ApiError from '../utils/apiError.js';

const signupSchema = z.object({
  name: z.string().nonempty('Name is required'),
  email: z.string().email('Invalid email address'),
  pass: z.string().min(8, 'Password must be at least 8 characters'),
});

const loginSchema = z.object({
  email: z.string().nonempty('Email is required'),
  pass: z.string().nonempty('Password is required'),
});

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.errors.map((issue) => ({
      field: issue.path.join('.') || 'body',
      message: issue.message,
    }));

    return next(new ApiError(400, 'Validation failed', { errors }));
  }

  req.body = result.data;
  return next();
};

export const validateSignup = validate(signupSchema);
export const validateLogin = validate(loginSchema);

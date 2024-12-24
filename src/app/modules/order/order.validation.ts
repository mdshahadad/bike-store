import { z } from 'zod';
import { Types } from 'mongoose';

export const OrderValidationSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .trim()
    .min(1, { message: 'Email is required' }),
  product: z.string().refine((value) => Types.ObjectId.isValid(value), {
    message: 'Invalid product ID. It must be a valid ObjectId.',
  }),
  quantity: z
    .number()
    .int({ message: 'Quantity must be an integer' })
    .positive({ message: 'Quantity must be a positive number' }),
  totalPrice: z
    .number()
    .positive({ message: 'Total price must be a positive number' })
    .min(0.01, { message: 'Total price must be greater than zero' }),
});

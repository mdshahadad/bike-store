import { z } from 'zod';

const ProductValidation = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .max(255)
    .nonempty({ message: 'Name cannot be empty' }),
  brand: z
    .string()
    .min(3)
    .max(255)
    .nonempty({ message: 'Brand cannot be empty' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  category: z.enum(['Mountain', 'Road', 'Hybrid', 'Electric'], {
    errorMap: () => ({
      message: 'Category must be one of Mountain, Road, Hybrid, or Electric',
    }),
  }),
  description: z
    .string()
    .min(3)
    .max(255)
    .nonempty({ message: 'Description cannot be empty' }),
  quantity: z
    .number()
    .positive({ message: 'Quantity must be a positive number' }),
  inStock: z.boolean(),
});

export default ProductValidation;

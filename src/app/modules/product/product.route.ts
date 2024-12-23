import { Router } from 'express';
import { ProductController } from './product.controller';

const route = Router();

// Create a product
route.post('/', ProductController.createProductController);

// Export the route
export const ProductRoute = route;

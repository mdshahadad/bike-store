import { Router } from 'express';
import { ProductController } from './product.controller';

const route = Router();

// Create a product
route.post('/', ProductController.createProductController);

// Get all products
route.get('/', ProductController.getAllProductsController);

// Get single product
route.get('/:productId', ProductController.getSingleProductController);

// Export the route
export const ProductRoute = route;

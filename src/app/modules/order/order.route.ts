import { Router } from 'express';
import { OrderController } from './order.controller';

const route = Router();

// Create order
route.post('/', OrderController.createOrderController);

// Calculate Revenue
route.get('/revenue', OrderController.calculateRevenueController);

export const OrderRoute = route;

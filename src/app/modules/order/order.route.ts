import { Router } from 'express';
import { OrderController } from './order.controller';

const route = Router();

route.post('/', OrderController.createOrderController);

export const OrderRoute = route;

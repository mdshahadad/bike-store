import { Request, Response } from 'express';
import { OrderService } from './order.service';

const createOrderController = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const result = await OrderService.createOrderIntoDB(order);

    res.status(201).json({
      status: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: (error as Error)?.message,
      data: {},
    });
  }
};

export const OrderController = {
  createOrderController,
};

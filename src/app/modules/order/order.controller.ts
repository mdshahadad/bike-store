import { Request, Response } from 'express';
import { OrderService } from './order.service';
import { OrderValidationSchema } from './order.validation';
import { handleValidationError } from '../product/product.errorHandler';
import { ZodError } from 'zod';
import process from 'process';

const createOrderController = async (req: Request, res: Response) => {
  try {
    const order = req.body;

    const validateOrder = OrderValidationSchema.parse(order);
    const result = await OrderService.createOrderIntoDB(validateOrder as any);

    res.status(201).json({
      status: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedError = handleValidationError(error);
      res.status(400).json(formattedError);
    }

    const formattedError = {
      message: 'Validation failed',
      status: false,
      error: {
        name: 'ValidatorError',
        errors: {
          message: (error as any)?.message,
          name: 'ValidatorError',
          properties: {
            message: (error as any)?.message,
            type: (error as any)?.code,
          },
          kind: (error as any)?.code,
          path: (error as any)?.path,
          value: (error as any)?.code,
        },
      },
      stack: process.env.NODE_ENV === 'development' && (error as Error)?.stack,
    };
    res.status(500).json(formattedError);
  }
};

// Calculate the total Revenue
const calculateRevenueController = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.calculateRevenue();
    res.status(200).json({
      status: true,
      message: 'Revenue calculated successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to calculate revenue',
      error: (error as Error)?.message,
    });
  }
};

// Export the controller

export const OrderController = {
  createOrderController,
  calculateRevenueController,
};

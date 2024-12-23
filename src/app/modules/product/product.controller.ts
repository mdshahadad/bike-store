import { Request, Response } from 'express';
import { ProductService } from './product.service';
import ProductValidation from './product.validation';
import { ZodError } from 'zod';
import { handleValidationError } from './product.errorHandler';

// Create Product Controller
const createProductController = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const ValidatedProduct = ProductValidation.parse(productData);

    const result = await ProductService.createProductIntoDB(ValidatedProduct);

    res.status(200).json({
      success: true,
      message: 'Bike created successfully',
      data: result,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedError = handleValidationError(error);
      res.status(400).json(formattedError);
    }

    res.status(500).json({
      message: (error as any)?.message,
      status: false,
      name: 'ValidatorError',
      error: {
        message: (error as any)?.message,
      },
      stack: (error as Error)?.stack,
    });
  }
};

// Get all products
const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    console.log('SearchTerm: ', searchTerm);
    const result = await ProductService.getAllProductsFromDB(searchTerm);

    res.status(200).json({
      success: true,
      message: 'Bikes retrieved successfully',
      data: result,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedError = handleValidationError(error);
      res.status(400).json(formattedError);
    }

    res.status(500).json({
      message: (error as any)?.message,
      status: false,
      name: 'ValidatorError',
      error: {
        message: (error as any)?.message,
      },
      stack: (error as Error)?.stack,
    });
  }
};

// Export the controller
export const ProductController = {
  createProductController,
  getAllProductsController,
};

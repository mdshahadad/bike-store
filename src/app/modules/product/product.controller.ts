import { Request, Response } from 'express';
import { ProductService } from './product.service';
import ProductValidation from './product.validation';
import { ZodError } from 'zod';
import { handleValidationError } from './product.errorHandler';
import process from 'process';

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
    // Handle the error

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

// Get single product
const getSingleProductController = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await ProductService.getSingleProductFromDB(id);

    res.status(200).json({
      status: true,
      message: 'Bike retrieved successfully',
      data: result,
    });
  } catch (error) {
    // Handle the error

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

// Update single product
const updateSingleProductController = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const productData = req.body;

    const result = await ProductService.updateSingleProductFromDB(
      id,
      productData,
    );

    res.status(200).json({
      status: true,
      message: 'Bike updated successfully',
      data: result,
    });
  } catch (error) {
    // Handle the error

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

// Delete single product
const deleteSingleProductController = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    await ProductService.deleteSingleProductFromDB(id);

    res.status(200).json({
      status: true,
      message: 'Bike deleted successfully',
      data: {},
    });
  } catch (error) {
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

// Export the controller
export const ProductController = {
  createProductController,
  getAllProductsController,
  getSingleProductController,
  updateSingleProductController,
  deleteSingleProductController,
};

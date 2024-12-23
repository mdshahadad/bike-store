import { TProduct } from './product.interface';
import Product from './product.model';

/* Create Product Service */
const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

// getAllProductsFromDB
const getAllProductsFromDB = async (query: any) => {
  let filter = {};

  if (query) {
    filter = {
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { brand: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
      ],
    };
  }
  const result = await Product.find(filter);
  return result;
};

// Export the service
export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
};

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

// Get single product from DB
const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);

  if (!result) {
    throw new Error(`Product Id: ${id} is not found`);
  }

  return result;
};

// Update single product from DB
const updateSingleProductFromDB = async (id: string, payload: TProduct) => {
  const result = await Product.findByIdAndUpdate(id, payload, { new: true });

  if (!result) {
    throw new Error(`Product Id: ${id} is not found`);
  }

  return result;
};

// Delete single product from DB
const deleteSingleProductFromDB = async (id: string) => {
  console.log(id);
  const result = await Product.findByIdAndDelete(id);
  console.log('Result: ', result);

  if (!result) {
    throw new Error(`Product Id: ${id} is not found`);
  }

  return result;
};

// Export the service
export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductFromDB,
  deleteSingleProductFromDB,
};

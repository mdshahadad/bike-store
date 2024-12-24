import Product from '../product/product.model';
import { TOrder } from './order.interface';
import Order from './order.model';

const createOrderIntoDB = async (order: TOrder) => {
  const { email, product, quantity, totalPrice } = order;

  const hasProduct = await Product.findById(product);
  if (!hasProduct) {
    throw new Error('Product not found');
  }

  const result = await Order.create(order);
  return result;
};

export const OrderService = {
  createOrderIntoDB,
};

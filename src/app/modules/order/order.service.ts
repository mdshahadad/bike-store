import Product from '../product/product.model';
import { TOrder } from './order.interface';
import Order from './order.model';

const createOrderIntoDB = async (order: TOrder) => {
  const { product, quantity } = order;

  const hasProduct = await Product.findById(product);
  if (!hasProduct) {
    throw new Error('Product not found');
  }

  if (!hasProduct.inStock || hasProduct.quantity < 0) {
    throw new Error(`The ${hasProduct.name} is out of stock now`);
  }

  if (hasProduct.quantity < quantity) {
    throw new Error(
      `The ${hasProduct.name} quantity has only ${hasProduct.quantity} left. But you want to buy ${quantity}`,
    );
  }

  const reducedQuantity = hasProduct.quantity - quantity;

  if (reducedQuantity === 0) {
    await Product.findByIdAndUpdate(
      hasProduct._id,
      { quantity: reducedQuantity, inStock: false },
      { new: true },
    );
  } else {
    await Product.findByIdAndUpdate(
      hasProduct._id,
      { quantity: reducedQuantity },
      { new: true },
    );
  }

  const result = await Order.create(order);
  return result;
};

// Calculate the total Revenue

const calculateRevenue = async () => {
  const result = await Order.aggregate([
    {
      $project: { totalPrice: { $multiply: ['$totalPrice', '$quantity'] } },
    },
    {
      $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } },
    },
    {
      $project: { _id: 0, totalRevenue: 1 },
    },
  ]);
  return result;
};

// Export the service

export const OrderService = {
  createOrderIntoDB,
  calculateRevenue,
};

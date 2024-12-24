import Product from '../product/product.model';
import { TOrder } from './order.interface';
import Order from './order.model';

const createOrderIntoDB = async (order: TOrder) => {
  const { product, quantity } = order;

  const hasProduct = await Product.findById(product);
  if (!hasProduct) {
    throw new Error('Product not found');
  }

  if (!hasProduct.inStock) {
    throw new Error(`The ${hasProduct.name} is out of stock now`);
  }

  const reducedQuantity = hasProduct.quantity - quantity;
  //   console.log(reducedQuantity);

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

export const OrderService = {
  createOrderIntoDB,
};

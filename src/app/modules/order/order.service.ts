import Product from '../product/product.model';
import { TOrder } from './order.interface';
import Order from './order.model';

const createOrderIntoDB = async (order: TOrder) => {
  const { email, product, quantity, totalPrice } = order;

  const hasProduct = await Product.findById(product);
  if (!hasProduct) {
    throw new Error('Product not found');
  }

  if (!hasProduct.inStock) {
    throw new Error('Product out of stock');
  }

  const reducedQuantity = hasProduct.quantity - quantity;
  console.log(reducedQuantity);

  if (reducedQuantity === 0) {
    const updateStock = await Product.findByIdAndUpdate(
      hasProduct._id,
      { quantity: reducedQuantity, inStock: false },
      { new: true },
    );
    console.log('UpdateStock:', updateStock);
  } else {
    const updateProduct = await Product.findByIdAndUpdate(
      hasProduct._id,
      { quantity: reducedQuantity },
      { new: true },
    );
    console.log('UpdateProduct:', updateProduct);
  }

  const result = await Order.create(order);
  return result;
};

export const OrderService = {
  createOrderIntoDB,
};

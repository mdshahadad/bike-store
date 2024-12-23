import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

const ProductSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: true,
      unique: [true, 'Product Name cannot be duplicated'],
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Mountain', 'Road', 'Hybrid', 'Electric'],
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
);

const Product = model<TProduct>('Product', ProductSchema);

export default Product;

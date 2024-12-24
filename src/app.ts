import express from 'express';
import { ProductRoute } from './app/modules/product/product.route';
import { OrderRoute } from './app/modules/order/order.route';

const app = express();

app.use(express.json());

// Product endpoint
app.use('/api/products', ProductRoute);

// Order endpoint
app.use('/api/orders', OrderRoute);

app.get('/', (req, res) => {
  res.send('This is the Bike Store server');
});

export default app;

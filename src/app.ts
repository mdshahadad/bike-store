import express from 'express';
import { ProductRoute } from './app/modules/product/product.route';

const app = express();

app.use(express.json());

app.use('/api/products', ProductRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;

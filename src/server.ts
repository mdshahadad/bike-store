import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
    if (!config.database_url) {
      throw new Error('Database URL is not defined');
    }
    await mongoose.connect(config.database_url);

    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();

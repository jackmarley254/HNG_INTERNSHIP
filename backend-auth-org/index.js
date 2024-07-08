import express, { json } from 'express';
import { config } from 'dotenv';
import db from './models';
import routes from './routes';
import errorHandler from './middleware/errorHandler';

config();
const app = express();
const PORT = process.env.PORT || 7000;

// Middleware
app.use(json());

// Routes
app.use('/api', routes);

// Error handler middleware
app.use(errorHandler);

// Database connection
db.sequelize.sync().then(() => {
  console.log('Database connected');
  // Start server
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

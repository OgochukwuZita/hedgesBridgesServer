import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import propertyRoutes from './Routes/propertyRoutes.js';
import searchRoutes from './Routes/searchRoutes.js';
import publicationRoutes from './Routes/publicationRoutes.js';
import reviewRoutes from './Routes/reviewRoutes.js';

dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Mongo connected'))
  .catch((err) => console.error(err));

// Register all route files
app.use('/api/property', propertyRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/publication', publicationRoutes);
app.use('/api/review', reviewRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the backend!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

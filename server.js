import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import propertyRoutes from './Routes/propertyRoutes.js';
import searchRoutes from './Routes/searchRoutes.js';
import publicationRoutes from './Routes/publicationRoutes.js';
import reviewRoutes from './Routes/reviewRoutes.js';

dotenv.config();

const app = express();

// ✅ Enable CORS
app.use(cors({
  origin: ['http://localhost:5173', 'https://hedgesbridges.netlify.app'],
  credentials: true,
}));

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Mongo connected'))
  .catch((err) => console.error(err));

// ✅ Routes
app.use('/api/property', propertyRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/publication', publicationRoutes);
app.use('/api/review', reviewRoutes);

// ✅ Test route
app.get('/', (req, res) => {
  res.send('Welcome to the backend!');
});

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});

// ✅ Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

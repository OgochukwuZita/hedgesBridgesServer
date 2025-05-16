import express from 'express';
import {
  createPublication,
  getPublications,
  getPublicationById,
  updatePublication,
  deletePublication
} from '../Controllers/publicationController.js';

const router = express.Router();

// Create a publication
router.post('/publications', createPublication);

// Get all publications
router.get('/publications', getPublications);

// Get a single publication by ID
router.get('/publications/:id', getPublicationById);

// Update a publication
router.put('/publications/:id', updatePublication);

// Delete a publication
router.delete('/publications/:id', deletePublication);

export default router;

import express from 'express';
import {protect} from '../middleware/authMiddleware.js';
import {createProperty, getProperties, getPropertyById, updateProperty, deleteProperty} from '../Controllers/propertyController.js';

const router = express.Router();

// POST route to create a property (protected)
router.post('/', protect, createProperty);

// GET route to fetch all properties
router.get('/', getProperties);

// GET route to fetch a single property by ID

router.get('/:id', getPropertyById);

// PUT route to update property details (protected)
router.put('/:id', protect, updateProperty);

// DELETE route to delete a property by ID (protected)
router.delete('/:id', protect, deleteProperty);

export default router;

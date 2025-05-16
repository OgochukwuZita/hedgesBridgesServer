import express from 'express';
import { searchContent } from '../Controllers/searchController.js';

const router = express.Router();

// GET route for searching publications, properties, and reviews
router.get('/', searchContent);

export default router;

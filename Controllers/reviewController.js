import express from 'express';
import {
  createReview,
  getReviews,
  deleteReview
} from '../Controllers/reviewController.js';

const router = express.Router();

// Create a review
router.post('/reviews', createReview);

// Get all reviews
router.get('/reviews', getReviews);

// Delete a review
router.delete('/reviews/:id', deleteReview);

export default router;

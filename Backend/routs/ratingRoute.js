import express from 'express';
import ratingMiddleware from '../middleware/ratingMiddleware.js'; // Ensure this middleware is correctly defined
import { addRating, updateRating, getItemRatings } from '../Controller/RatingController.js';


const ratingRouter = express.Router();

// POST request to add a rating. Requires authentication.
ratingRouter.post('/rate', ratingMiddleware, addRating);

// PUT request to update a rating. Requires authentication.
ratingRouter.put('/rate', ratingMiddleware, updateRating);

// GET request to fetch ratings for a specific item. This does not require authentication.
ratingRouter.get('/rate/:itemId', getItemRatings);

export default ratingRouter;

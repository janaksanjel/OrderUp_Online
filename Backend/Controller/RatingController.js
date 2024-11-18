import mongoose from 'mongoose';
import ratingModel from '../models/rating.js';
import itemModel from '../models/foodmodel.js';

const addRating = async (req, res) => {
  try {
    const { productId, rating } = req.body;
    const userId = req.userId; // Make sure req.userId is set by a middleware

    // Check if the user has already rated this product
    const existingRating = await ratingModel.findOne({ userId, itemId: productId });
    if (existingRating) {
      return res.status(400).json({ success: false, message: "You have already rated this item." });
    }

    // Create a new rating
    const newRating = new ratingModel({
      userId,
      itemId: productId,
      rating
    });

    await newRating.save();

    // Update the item's average rating and number of ratings
    const item = await itemModel.findById(productId);
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found." });
    }

    const totalRatings = await ratingModel.countDocuments({ itemId: productId });
    const averageRating = await ratingModel.aggregate([
      { $match: { itemId: new mongoose.Types.ObjectId(productId) } },  // Use 'new' keyword here
      { $group: { _id: '$itemId', averageRating: { $avg: '$rating' } } }
    ]);

    item.averageRating = averageRating[0]?.averageRating || 0;
    item.numberOfRatings = totalRatings;
    await item.save();

    res.status(201).json({ success: true, message: "Rating added successfully!" });
  } catch (error) {
    console.error('Error adding rating:', error.message); // Use error.message for more concise logs
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

const updateRating = async (req, res) => {
  try {
    const { productId, rating } = req.body;
    const userId = req.userId;

    // Update the rating
    const updatedRating = await ratingModel.findOneAndUpdate(
      { userId, itemId: productId },
      { rating },
      { new: true }
    );

    if (!updatedRating) {
      return res.status(404).json({ success: false, message: "Rating not found." });
    }

    // Update the item's average rating and number of ratings
    const item = await itemModel.findById(productId);
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found." });
    }

    const totalRatings = await ratingModel.countDocuments({ itemId: productId });
    const averageRating = await ratingModel.aggregate([
      { $match: { itemId: new mongoose.Types.ObjectId(productId) } },  // Use 'new' keyword here
      { $group: { _id: '$itemId', averageRating: { $avg: '$rating' } } }
    ]);

    item.averageRating = averageRating[0]?.averageRating || 0;
    item.numberOfRatings = totalRatings;
    await item.save();

    res.status(200).json({ success: true, message: "Rating updated successfully!" });
  } catch (error) {
    console.error('Error updating rating:', error.message);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// Backend logging example


const getItemRatings = async (req, res) => {
  try {
    const { itemId } = req.params;

    // Fetch all ratings for the item
    const ratings = await ratingModel.find({ itemId });

    if (!ratings.length) {
      return res.status(200).json({ success: true, averageRating: 0, totalRatings: 0 });
    }

    // Calculate the average rating
    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    const averageRating = totalRating / ratings.length;

    res.status(200).json({ success: true, averageRating, totalRatings: ratings.length });
  } catch (error) {
    console.error('Error fetching ratings:', error.message);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};







export { addRating, updateRating, getItemRatings };

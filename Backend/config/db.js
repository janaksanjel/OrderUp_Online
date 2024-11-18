import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI; // Read MONGO_URI from environment variables
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined. Please check your environment variables.");
    }

    await mongoose.connect(MONGO_URI, {
      dbName: 'test', // Replace 'test' with your database name
      useNewUrlParser: true, // Ensure compatibility
      useUnifiedTopology: true, // Better connection management
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the process on connection failure
  }
};

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://janaksa:9840748285@orderonline.xnn0w.mongodb.net/test', {
      dbName: 'test', // Replace with the name of your database
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://janaksa:9840748285@orderonline.xnn0w.mongodb.net/', {
      useNewUrlParser: true,  // Ensures use of the new MongoDB connection string parser
      useUnifiedTopology: true,  // Enables the unified topology layer
      dbName: 'test',  // Replace with your specific database name
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit process with failure if connection fails
  }
};

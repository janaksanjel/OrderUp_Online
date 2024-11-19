import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://janaksa:9840748285@orderonline.xnn0w.mongodb.net/')
        .then(() => console.log('MongoDB Connected...'))
}

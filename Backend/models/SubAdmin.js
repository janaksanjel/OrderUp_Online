import mongoose from "mongoose";

// Define the schema without the SubAdminId field
const SubAdminSchema = new mongoose.Schema({
    SubAdminName: { type: String, required: true },
    SubAdminPassword: { type: String, required: true },
});

// Compile the model (if it doesn't already exist)
const SubAdminmodel = mongoose.models.SubAdmin || mongoose.model("SubAdmin", SubAdminSchema);

export default SubAdminmodel;

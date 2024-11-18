import mongoose from "mongoose";

const SuperAdminSchema = new mongoose.Schema({
    SuperAdminId: { type: String, required: true },
    SuperAdminName: { type: String, required: true },
    SuperAdminPassword: { type: String, required: true },
    // Add additional fields if needed
});

const SuperAdminModel = mongoose.model("SuperAdmin", SuperAdminSchema);

export default SuperAdminModel;

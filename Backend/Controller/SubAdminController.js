import bcrypt from 'bcryptjs';
import SubAdminmodel from "../models/SubAdmin.js";

// Login Subadmin
const loginsubadmin = async (req, res) => {
    const { SubAdminName, SubAdminPassword } = req.body;

    try {
        // Find the subadmin by name
        const subadmin = await SubAdminmodel.findOne({ SubAdminName });
        if (!subadmin) {
            return res.status(404).json({ msg: "SubAdmin Not Found" });
        }

        // Compare the plaintext password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(SubAdminPassword, subadmin.SubAdminPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ msg: "Invalid Password" });
        }

        // Successful login
        res.json({ msg: "Login Successful", subadmin });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
};

// Add a New Subadmin
const addSubAdmin = async (req, res) => {
    const { SubAdminName, SubAdminPassword } = req.body;

    // Check if both fields are provided
    if (!SubAdminName || !SubAdminPassword) {
        return res.status(400).json({ message: "Both SubAdminName and SubAdminPassword are required" });
    }

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(SubAdminPassword, 10);

        // Create a new subadmin document using MongoDB's default _id
        const newSubAdmin = new SubAdminmodel({
            SubAdminName,
            SubAdminPassword: hashedPassword // Store hashed password for hash SubAdminPassword:hashedPassword
        });

        // Save the subadmin document
        await newSubAdmin.save();

        // Return the response with the automatically generated _id and SubAdminName
        res.status(201).json({
            message: "Subadmin added successfully",
            SubAdminId: newSubAdmin._id, // Use the auto-generated _id
            SubAdminName: newSubAdmin.SubAdminName,
        });
    } catch (error) {
        console.error("Error adding subadmin:", error.message); // Log detailed error message

        // Return a response with the error details
        res.status(500).json({
            message: "Error adding subadmin",
            error: error.message,
            stack: error.stack, // Add stack trace for detailed debugging
        });
    }
};


// Fetch All Subadmins
const fetchSubAdmins = async (req, res) => {
    try {
        // Fetch all subadmins
        const subadmins = await SubAdminmodel.find();

        // Return the list of subadmins
        res.json({ msg: "SubAdmins fetched successfully", subadmins });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
};

export { loginsubadmin, addSubAdmin, fetchSubAdmins };

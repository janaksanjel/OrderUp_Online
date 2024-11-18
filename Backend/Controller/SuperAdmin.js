import SuperAdminModel from "../models/SuperAdminModel.js";

const loginSuperAdmin = async (req, res) => {
    const { SuperAdminName, SuperAdminPassword } = req.body;

    try {
        // Find the super admin by name
        const superAdmin = await SuperAdminModel.findOne({ SuperAdminName });
        if (!superAdmin) {
            return res.status(404).json({ msg: "Super Admin Not Found" });
        }

        // Compare the plaintext password
        if (SuperAdminPassword !== superAdmin.SuperAdminPassword) {
            return res.status(401).json({ msg: "Invalid Password" });
        }

        // Successful login
        res.json({ msg: "Login Successful", superAdmin });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
};

export default loginSuperAdmin;

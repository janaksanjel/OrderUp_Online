import userModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

// Create a JWT token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
};

// Login user
const loginuser = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user =await userModel.findOne({email});
        if(!user) {
            return res.json({success:false,message:"User Doesn`t Exist"})
        }

        const isMatch =await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({success:false,message:"Password is Incorrect"})

        }
        const token = createToken(user._id);
        res.json({success:true,message:"Login Successful",token:token,userId:user._id})

    }catch(error){

        console.log(error);
        res.json({success:false,message:"Error Having Login"})




    }
};

// Register user
const registeruser = async (req, res) => {
    const { name, password, email } = req.body;

    try {
        // Check if the user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User Already Exists" });
        }

        // Validate email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please Enter a Valid Email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password Must Be Strong" });
        }

        // Hash user password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        });

        const user = await newUser.save();

        const token = createToken(user._id);
        res.json({ success: true, message: "User Created Successfully", token: token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something Went Wrong" });
    }
};


//fatch user data  for admin

const fetchuserdata = async (req, res) => {

    try {
        const users = await userModel.find({},'-password')   //,'-password' this use for decripted password
        res.json({ success: true, message: "User Data Fetched Successfully", data:users})


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something Went Wrong" });
        
    }

}


// Delete user for admin
const deleteUseradmin = async (req, res) => {
    try {
        // Check if the user ID is provided in the request body
        if (!req.body._id) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Find and delete the user by ID
        const user = await userModel.findByIdAndDelete(req.body._id);

        // If the user was not found, send a 404 response
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Send a success response
        res.json({ success: true, message: "User Deleted Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Something Went Wrong" });
    }
};



// fatch user profile for frontend



const fetchUserProfile = async (req, res) => {
    try {
        const userId = req.userId; // Assuming userId is extracted from token in middleware
        const user = await userModel.findById(userId, '-password'); // Exclude password field

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, data: user });
    } catch (error) {
        console.error("Error getting user profile:", error);
        res.status(500).json({ success: false, message: "Error getting user profile" });
    }
};






export { loginuser, registeruser ,fetchuserdata,deleteUseradmin,fetchUserProfile};

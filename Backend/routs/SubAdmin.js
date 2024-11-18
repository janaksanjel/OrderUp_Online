import express from "express";
import { loginsubadmin, addSubAdmin, fetchSubAdmins } from "../Controller/SubAdminController.js";


const SubAdminrouter = express.Router();

// Define the route for logging in a sub-admin
SubAdminrouter.post("/login", loginsubadmin); // Changed route to /login for consistency
SubAdminrouter.post("/add", addSubAdmin);
SubAdminrouter.get("/fetch", fetchSubAdmins);

export default SubAdminrouter;

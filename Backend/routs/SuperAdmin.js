import express from "express";
import loginSuperAdmin from "../Controller/SuperAdmin.js";

const SuperAdminRouter = express.Router();

// Route for super admin login
SuperAdminRouter.post("/login", loginSuperAdmin);

export default SuperAdminRouter;

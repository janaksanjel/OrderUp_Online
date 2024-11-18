import express from "express";
import { deleteUseradmin, fetchuserdata, fetchUserProfile, loginuser, registeruser } from "../Controller/UserController.js";

import proauthMiddleware from "../middleware/profileauth.js";




const userRouter = express.Router()


userRouter.post("/register", registeruser);
userRouter.post("/login", loginuser);
userRouter.get("/userinfo", fetchuserdata);
userRouter.post("/userdelete", deleteUseradmin);
userRouter.post("/userprofile", proauthMiddleware, fetchUserProfile);





export default userRouter;

//orginal
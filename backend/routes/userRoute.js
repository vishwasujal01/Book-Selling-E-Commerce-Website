import express from 'express';
import { adminlogin } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/admin', adminlogin);

export default userRouter;  
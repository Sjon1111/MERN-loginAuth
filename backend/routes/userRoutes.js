import express from 'express';
import { userSignUp, getUserData } from '../controller/userController.js';

const router = express.Router();

router.post("/signUp", userSignUp)

router.get("/get", getUserData)

export default router;
import express from 'express';
import { userSignin, dashbord, resetpassword, updatePassword } from '../controller/authController.js';

const router = express.Router();


router.post("/signin", userSignin)
router.get("/dashbord", dashbord)
router.post("/reset", resetpassword)
router.put("/updatePassword", updatePassword)
export default router;
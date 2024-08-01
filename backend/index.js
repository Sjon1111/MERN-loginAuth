import express from 'express'
import signup from './Model/signup.js'
import { userSignUp, getUserData, resetpassword, updatePassword, userSignin, dashbord } from './controller/userController.js';

import cors from 'cors'


const app = express();
app.use(cors());
const port = 8000;
app.use(express.json())

app.get("/get", (req, res) => {
  console.log("get Method Running")
  res.send("Get Method running")
})

app.post("/signUp", userSignUp)
app.post("/signin", userSignin)
app.get("/users", getUserData)
app.get("/dashbord", dashbord)
app.post("/reset", resetpassword)
app.put("/updatePassword", updatePassword)
app.listen(port, () => { console.log("server is running on port", port) })

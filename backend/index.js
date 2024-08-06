import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

import cors from 'cors'


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json())
const PORT = process.env.PORT;
const DB_CONNECTION = process.env.DB_CONNECTION;

mongoose.connect(DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log("connection successfull") })
  .catch(() => { console.log("connection failed") })

app.use('/auth', authRoutes);
app.use('/user', userRoutes)

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})

// app.get("/get", (req, res) => {
//   console.log("get Method Running")
//   res.send("Get Method running")
// })

// app.post("/signUp", userSignUp)
// app.post("/signin", userSignin)
// app.get("/users", getUserData)
// app.get("/dashbord", dashbord)
// app.post("/reset", resetpassword)
// app.put("/updatePassword", updatePassword)
// app.listen(port, () => { console.log("server is running on port", port) })

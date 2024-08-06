import express from 'express';
import mongoose from 'mongoose';
import mongodb from 'mongodb';
import user from '../Model/signup.js';
import { sendEmail } from '../utils/nodemailer.js';
import bcrypt from 'bcrypt';

import generator from 'generate-password';
import { ClientEncryption, MongoClient } from 'mongodb';
import { secretkey } from '../utils/jwtConfig.js';
import jwt from 'jsonwebtoken';

export const userSignin = async (req, res) => {
  const { username, password } = req.body;
  const Email = username;
  console.log(req.body)
  const users = await user.findOne({ Email });

  console.log(users)
  if (!users) {
    return res.status(401).json({ message: 'Invalid user' });
  }



  const isPasswordValid = await bcrypt.compare(password, users.Password);
  console.log(isPasswordValid)

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const payload = {
    Email: username,
    Password: password
  }
  const token = jwt.sign(payload, secretkey, { expiresIn: '1h' })



  res.json({ token })


  // const responce = await user.findOne({ username, password })
  // if (!responce) {
  //   return res.status(404).json({ message: 'Invalid credential' });
  // }
  // else {
  //   res.send(responce)
  // }


}
var text;
export const dashbord = async (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretkey, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }

    res.json({ message: 'Welcome to the protected route' + token });
  });
};

export const resetpassword = async (req, res) => {
  const { to, subject } = req.body;

  const otp = generator.generate({
    length: 6,
    numbers: true
  });

  text = otp;
  console.log(text);

  try {
    await sendEmail(to, subject, text);
    res.status(200).send('Email sent successfully');

  } catch (error) {
    res.status(500).send('Error sending email');
  }



}

export const updatePassword = async (req, res) => {
  // console.log(text)
  // console.log(req.body)
  const { otp, email, newPassword } = req.body;

  console.log(req.body);

  if (otp === text) {
    console.log(newPassword)
    console.log("compare Successfully")
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log(hashedPassword);
    await user.findOneAndUpdate({ Email: email }, { Password: hashedPassword });
    console.log("Update successfully")
    res.status(200).send('password reset successfully');

  }
  else {
    console.log("invalid otp")
  }
  // res.send(text)
}
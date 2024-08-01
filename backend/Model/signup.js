import mongoose from 'mongoose'
import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  Name: {
    type: String,
    maxlenght: 40,
    require: true
  },
  Email: {
    type: String,
    minlenght: 10,
    maxlenght: 50,
    require: true,
    unique: true,
    VarDate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid Email"
    }


  },

  Number: {
    type: Number,
    require: true,
    unique: true,
    minlenght: 10,
    maxlenght: 10

  },

  Password: {

    type: String,
    minlenght: 5,
    maxlenght: 20,
    require: true

  },
  IsChecked: {
    type: Boolean,
    require: true

  },
  Gender: {
    type: String,
    require: true

  }
})

const user = model("user", userSchema);
export default user;
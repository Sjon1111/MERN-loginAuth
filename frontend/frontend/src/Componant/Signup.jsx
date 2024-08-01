import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style.scss'
export default function Signup() {
  const [userdata, setuserdata] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    isChecked: "",
    gender: ""



  })
  const handlechange = (event) => {

    const { name, value, type, checked } = event.target;
    const fieldvalue = type === 'checkbox' ? checked : value;

    setuserdata({ ...userdata, [name]: fieldvalue });

  }
  const register = async () => {
    // event.preventDefault();

    const responce = await axios.post("http://localhost:8000/signUp", userdata)
    console.log(responce)
    console.log(userdata)



  }


  return (
    <div className='box'>

      <div className='form'>
        <form onSubmit={register}>
          <input type='text' placeholder='name' id='name' name='name' value={userdata.name} onChange={handlechange} />
          <input type='email' placeholder='email' id='email' name='email' value={userdata.email} onChange={handlechange} />
          <input type='number' placeholder='number' id='number' name='number' value={userdata.number} onChange={handlechange} />
          <input type='password' placeholder='password' id='password' name='password' value={userdata.password} onChange={handlechange} />
          <br /><label>Are you 18 +</label> <input type='checkbox' id="isChecked" name='isChecked' value={userdata.isChecked} onChange={handlechange} />
          <select name='gender' id='gender' value={userdata.gender} onChange={handlechange}>
            <option>Select</option>
            <option>Male</option>
            <option>Female</option>
          </select>
          <button type='submit'>Submit</button>
          <Link to="/login">Existing user! login here</Link>
        </form>



      </div>
    </div>
  )
}

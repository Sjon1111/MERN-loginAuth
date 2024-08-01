import React, { useRef, useState } from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';




export default function Signin({ onLogin }) {

  const refElement = useRef(null)
  const refElement2 = useRef(null)
  const refElement3 = useRef(null)
  const refElement4 = useRef(null)
  const refElement5 = useRef(null);
  const [signin, setsignin] = useState({
    username: "",
    password: ""

  })
  const [toemail, settoemail] = useState({
    to: "",
    subject: "OTP For reset password"
  })

  const [otp, setotp] = useState("")
  // const [isLogin, setisLogin] = useState(false)
  const [newpassword, setnewpassword] = useState("");
  const navigate = useNavigate();

  const visibility = () => {

    if (refElement.current.style.display === "block") {
      refElement.current.style.display = "none";
      refElement2.current.style.display = 'block';
    }
    else {
      refElement.current.style.display = "block";
      refElement2.current.style.display = 'none'
    }
  };

  const generateOtp = async () => {
    refElement3.current.style.display = 'block';
    refElement5.current.style.display = 'block';
    console.log(toemail)
    const otpemail = await axios.post("http://localhost:8000/reset", toemail)
    console.log(otpemail)
    alert(otpemail.data)
  }

  const submitOtp = () => {

    refElement4.current.style.display = 'block';
    refElement2.current.style.display = 'none';


  }
  const resetPassword = async () => {

    const otpresponse = await axios.put("http://localhost:8000/updatePassword", { query1: otp, query2: toemail.to, query3: newpassword }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    alert(otpresponse.data)
    window.location.reload();
    // console.log(otp, toemail.to, newpassword)
  }
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldvalue = type === 'checkbox' ? checked : value;
    setsignin({ ...signin, [name]: fieldvalue });
  }
  const emailHandle = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldvalue = type === 'checkbox' ? checked : value;
    settoemail({ ...toemail, [name]: fieldvalue })
  }
  const handleOTP = (e) => {
    setotp(e.target.value)

  }
  const handlenewpassword = (e) => {
    setnewpassword(e.target.value)

  }
  const login = async () => {
    event.preventDefault();
    try {


      const response = await Axios.post("http://localhost:8000/signin", signin)

      onLogin(response.data.token);
      navigate('/dashbord');
      console.log(response.data.token)
    }
    catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        alert(error.response.data.message);
      }
      else if (error.request) {
        // The request was made but no response was received
        console.error('Error: No response received:', error.request);
        alert('No response from the server. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
        alert('An error occurred. Please try again.');
      }


    }
  }


  return (
    <div className='box' >
      <div className='form' ref={refElement} style={{ display: 'block' }}>
        <form onSubmit={login} >
          <input type='text' placeholder='username' id='username' name='username' value={signin.username} onChange={handleChange} />

          <input type="password" id='password' name='password' placeholder='password' value={signin.password} onChange={handleChange} />
          <button type='submit' >Login</button>
          {/* <Link to="/"> Forget Password</Link> */}

        </form>

        <Link to="/">   New User? SignUp</Link>

        <button className='btn' onClick={visibility}> Forget Password </button>
      </div>
      <div className='form' ref={refElement2} style={{ display: 'none' }}>
        <input type='text' placeholder='Enter Email' id='to' name='to' value={toemail.to} onChange={emailHandle} />

        <button onClick={generateOtp}>Generate OTP</button>

        <input type='text' placeholder='OTP' ref={refElement3} style={{ display: 'none' }} value={otp} onChange={handleOTP} />
        <button onClick={submitOtp} ref={refElement5} style={{ display: 'none' }} >Submit</button>
      </div>
      <div className='form' ref={refElement4} style={{ display: 'none' }}>
        <input type='password' placeholder='Enter New Password' />
        <input type='password' placeholder='Confirm New Password' value={newpassword} onChange={handlenewpassword} />
        <button onClick={resetPassword}>Reset Password</button>
      </div>

    </div>
  )
}

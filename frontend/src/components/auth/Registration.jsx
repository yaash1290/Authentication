import React, { useState } from "react";
import "../../SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../utils.jsx";
import { ToastContainer } from "react-toastify";

function Registration() {
  const [input, setInput] = useState({
    fullname: "",
    dateofbirth:"",
    email: "",
    password: "",
});

const navigate = useNavigate();

const changeEventHandler = (e) => {
  setInput({ ...input, [e.target.name]: e.target.value });
}
console.log("info : ", input);

const submitHandler=async(e)=>{
  e.preventDefault();
  const {fullname , dateofbirth , email , password}=input;
  if(!fullname || !dateofbirth || !email || !password){
    return handleError('Something is missing');
  }
  try {
    const url = "https://authentication-k5yq.onrender.com/api/v1/user/register";
    const response = await fetch(url , {
      method:"POST",
      headers:{
        'content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    });
    const result = await response.json();
    const {success , message,error}=result;
    if(success){
      setTimeout(()=>{
       navigate("/login")
      },1000)
      return handleSuccess(message);
    }
    else if(!success){
      return handleError(message);
    }
    console.log(result);
  } catch (error) {
    return handleError(error);
  }
}

  return (
    <div className="registration-container">
      <div className="registration-box">
        <h2 className="title">SIGN UP</h2>
        <div className="avatar">
          <i className="fa fa-user-circle"></i>
        </div>
        <form onSubmit={submitHandler}>
          {/* Full Name Input */}
          <div className="input-container">
            <input type="text" 
            value={input.fullname}
            name="fullname"
            onChange={changeEventHandler} 
            placeholder="Full Name" 
            className="input-field" />
          </div>

          {/* Date of Birth Input */}
          <div className="input-container">
            <input type="date" 
            value={input.dateofbirth}
            name="dateofbirth"
            onChange={changeEventHandler}
            className="input-field" />
          </div>

          {/* Email Input */}
          <div className="input-container">
            <input type="email" 
            value={input.email}
            name="email"
            onChange={changeEventHandler}
            placeholder="Email" className="input-field" />
          </div>

          {/* Password Input */}
          <div className="input-container">
            <input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Password"
              className="input-field"
            />
          </div>
          <span className='text-sm'>Already have an account? <Link to="/login" className="signUpTag">Login</Link></span>
          <button type="submit" className="login-button">
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registration;

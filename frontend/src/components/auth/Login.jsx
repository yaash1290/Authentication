import { Link, useNavigate } from "react-router-dom";
import "../../Login.css";
import { useState } from "react";
import { handleError, handleSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  console.log("info : ", input);

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = input;
    if (!email || !password) {
      alert("Something is missing");
    }
    try {
      const url = "http://localhost:8000/api/v1/user/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const result = await response.json();
      const { success, token, name , message} = result;
      if (success) {
        localStorage.setItem("token", token);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
          return handleSuccess(message)
        }, 1000);
      }else if(!success){
         return handleError(message)
      }
      console.log(result);
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="title">SIGN IN</h2>

        <div className="avatar">
          <i className="fa fa-user-circle"></i>
        </div>
        <form onSubmit={submitHandler}>
          <div className="input-container">
            <input
              type="text"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="username"
              className="input-field"
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="password"
              className="input-field"
            />
          </div>
          <div className="options">
            <span className="text-sm">
              Don't have an account? <Link to="/registration" className="loginTag">signUp</Link>
            </span>
          </div>
          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

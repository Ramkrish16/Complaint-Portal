import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import bi from './image/backImg.jpg';
import fi from './image/frontImg.jpg';



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn} = useUserAuth();
  const navigate = useNavigate();
  const [email1, setEmail1] = useState("");
  const [error1, setError1] = useState("");
  const [password1, setPassword1] = useState("");
  const { signUp } = useUserAuth();

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    setError1("");
    try {
      await signUp(email1, password1);    
      toast.info('Registration Successfull', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      document.getElementById("flip").checked=false;
    } catch (err) {
      setError1(err.message);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {

      if(email === "admin@gmail.com")
      {
        
        console.log("Hii Admin")
        navigate("/admin");
      }
      else{
        toast.success('Login Successfull', {
          position: "top-right",
          autoClose: 2700,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        await logIn(email, password);
        navigate("/home");


      }
     
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
    <html lang="en" dir="ltr">
<head>
<meta charset="UTF-8"/>
<link rel="stylesheet" href="D:\Placement activities\React JS\Projects\Complaint_Portal\src\components\Login.css"></link>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
<meta name="viewport" width="device-width"/>
</head> 
<body className="body">
<div className="container">
    <input type="checkbox" id="flip"/>
    <div className="cover">
      <div className="front">
        <img src={fi} alt="Not work"/>
        {/* <div className="text">
          <span className="text-1">Every new friend is a <br/> new adventure</span>
          <span className="text-2">Let's get connected</span>
        </div> */}
      </div>
      <div className="back">
        <img className="backImg" src={bi} alt="okkk"/>
        {/* <div className="text">
          <span className="text-1">Complete miles of journey <br/> with one step</span>
          <span className="text-2">Let's get started</span>
        </div> */}
      </div>
    </div>
    <div className="forms">
        <div className="form-content">
          <div className="login-form">
            <div className="title">Login</div>
          <form onSubmit={handleSubmit}>
            <div className="input-boxes">
              <div className="input-box">
                <i className="fas fa-envelope"></i>
                <p>{error}</p>
                <input type="text" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required/>
              </div>
              <div className="input-box">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Enter your password"  onChange={(e) => setPassword(e.target.value)} required/>
              </div>
              <div className="button input-box">
                <input type="submit" value="Submit"/>
              </div>
              <div className="text sign-up-text">Don't have an account? <label for="flip">Signup now</label></div>
            </div>
        </form>
      </div>
        <div className="signup-form">
          <div className="title">Signup</div>
        <form onSubmit={handleSubmit1}>
            <div className="input-boxes">
              <div className="input-box">
                <i className="fas fa-user"></i>
                <p>{error1}</p>
                <input type="text" placeholder="Enter your name" required/>
              </div>
              <div className="input-box">
                <i className="fas fa-envelope"></i>
                <input type="text" placeholder="Enter your email" onChange={(e) => setEmail1(e.target.value)} required/>
              </div>
              <div className="input-box">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Enter your password" onChange={(e) => setPassword1(e.target.value)} required/>
              </div>
              <div className="button input-box">
                <input type="submit" value="Submit"/>
              </div>
              <div className="text sign-up-text">Already have an account? <label for="flip">Login now</label></div>
            </div>
      </form>
    </div>
    </div>
    </div>
  </div>
</body>
<ToastContainer />
</html>
</>

  )
}

export default Login
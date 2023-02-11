import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
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
      await signUp(email, password);    
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div>
        <h2>Signup</h2>
        {error}
        <form onSubmit={handleSubmit}>
        <input type="text"
              placeholder="Name"></input>
        <input type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}></input>

        <input type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}></input>
        <input type="tel"
              placeholder="Mobile No"
              ></input>
          

          <div>
            <button type="Submit">
              Sign up
            </button>
          </div>
        </form>
      </div>
      <div>
        Already have an account? <Link to="/">Log In</Link>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;

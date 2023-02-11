import React, { useState } from "react"
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import Popform from "./popform";
import Trackcomplaint from "./trackcomplaint";
import logo from './image/logo.png';
import "./temp.css"
import Contactus from "./contactus";
import Myvideo from './image/videoplayback.mp4'


const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [modalOpen3, setModalOpen3] = useState(false);
  const { logOut, user } = useUserAuth();
  
  window.sharedData = { email: user.email };
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  

  
  return (
    <>
    <html lang="en" dir="ltr">
   <head>
      <meta charset="utf-8"/>     
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
   </head>
   <body>      
      <div>
      <nav>
         <div className="logo">
         <img src={logo} alt="Logo" />
            PCSP
         </div>
         <input type="checkbox" id="click"/>
         <label for="click" className="menu-btn">
         <i className="fas fa-bars"></i>
         </label>
         <ul > 
            <li><a href='#a' onClick={() => {setModalOpen1(true);}}>Trackcomplaint</a></li> 
            <li><a href='#a' onClick={() => {setModalOpen3(true);}}>Having Issue?</a></li> 
            <li><a href="https://youtu.be/hJHvdBlSxug">How It Works</a></li>  
            <li><a href='#a' onClick={handleLogout}>Logout</a></li> 
         </ul>
      </nav>
      </div>
      <div className="vedio">
      <video width="100%" autoPlay loop muted playsInline>
        <source src={Myvideo} type='video/mp4'></source>
        </video>
         <div className="content" >
         <div>
         Have any Problem,
         </div>
         <div>
         Register your complaint now.
         </div><br/>
         <button className='buttonreg' onClick={() => {setModalOpen(true); }}>Register Complaint</button>
      </div>
      {modalOpen1 && <Trackcomplaint setOpenModal1={setModalOpen1} />}
      {modalOpen && <Popform setOpenModal={setModalOpen} />}
      {modalOpen3 && <Contactus setOpenModal3={setModalOpen3} />}
      </div>
      
      
   </body>
</html>
    </>
  );
};

export default Home;



import React from "react";
import emailjs from '@emailjs/browser';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./Login.css";


function Contactus({setOpenModal3}) {
    const sendemail = (e) =>{
        e.preventDefault();
        emailjs.sendForm('service_3prlvgp','template_q2ij9pz',e.target,'a7jXLBTpEM8GI2w9b');
        emailjs.sendForm('service_3prlvgp','template_3nevnpo',e.target,'a7jXLBTpEM8GI2w9b');
        console.log("DONE");
        setOpenModal3(false);
    }
  return (
    <div className="modalBackground">
    <div className="modalContainer">
      <div className="titleCloseBtn">
        <button className="close"
          onClick={() => {
            setOpenModal3(false);
          }}
        >
         <i className="fas fa-close"></i>
        </button>
      </div>
      <div className="title">
        <h1>Contact Form</h1>
        <form onSubmit={sendemail}>
        <div className="compform">
        <i className="fas fa-envelope"></i>
        <input size="36" type='text' name="email" placeholder="Email" required></input><br/>
        <textarea rows="5" cols="42" type='textarea' name="issue" placeholder="Write an Issue" required></textarea><br></br>
        <button className="buttonreg" type="submit">Submit</button>
        </div>
        </form>
      </div>     
      </div>
    </div>
  )
}

export default Contactus
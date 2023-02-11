import React, { useState } from "react"
import { storage } from '../firebase';
import "./temp.css";
import app from '../firebase';
import {getDatabase, ref,set,get,child,update} from "firebase/database";
import '@fortawesome/fontawesome-free/css/all.min.css';

let globtrack;


function Popform({ setOpenModal }) {
  
  const [name, setName]= useState("");
  const [ID, setID]= useState("");
  const [Complaint, setComplaint]= useState("");
  const[image,setimage]= useState('');
  const[compid,setcompid]=useState('');
  let trackid;
  trackid=window.sharedData.email;
  globtrack=trackid;


  get(child(ref(getDatabase(app)),'noofcomp/')).then((snapshot)=>{
    snapshot.forEach((snap) => {
    console.log(snap.val())
    setcompid(snap.val())
    })
    })
  

  const handleSubmit = (e) =>{
    e.preventDefault();
    setOpenModal(false); 
    set(ref(getDatabase(app),'RaisedComplaints/'+compid+Complaint),
    {
      name:name,
      ID:ID,
      Complaint:Complaint,
      Email:globtrack,
      Status:"Pending",
      Delete:"NO",
      ComplaintID:compid
    })
    .then(()=>{
      console.log("Done");
    })
      
    

    if(image == null)
    return;
    const imageref = storage.ref('complaints/'+Complaint).put(image)
    .on("state_changed",console.log(null),alert);
    imageref();


    setName("");
    setID("");
    setComplaint("");

    update(ref(getDatabase(app),'noofcomp/'),
    {
      ComplaintID:compid-1,
    })
  }

  return (
    
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button className="close"
            onClick={() => {
              setOpenModal(false);
            }}>
            <i className="fas fa-close"></i>
          </button>
        </div>
        <div className="title">
          <h1>Complaint Form</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="compform">     
            <i className="fas fa-user"></i>
          <input size="36"type='text' placeholder="Name" value={name} onChange={(e)=> setName(e.target.value) } required></input><br></br><br></br>
            <i className="fas fa-id-card"></i>
          <input size="36" type='text' placeholder="ID" value={ID} onChange={(e)=> setID(e.target.value)} required></input><br></br><br></br>
          <textarea rows="5" cols="42" placeholder="Your Complaint in detail" value={Complaint} onChange={(e)=> setComplaint(e.target.value)} required></textarea>        
          <input type="file" id="file" onChange={(e) => {setimage(e.target.files[0])}}></input><br/><br></br>
          <label className="redhover" for="file"><i className="fas fa-image"></i>{image === ""?"Insert an Image":"Image Inserted"}</label><br></br><br></br>
          <button className="buttonreg"
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>&nbsp;&nbsp;&nbsp;
          <button className="buttonreg">Submit</button>
          </div>

        </form>
        
          
         
        </div>
      </div>
  );
}

export default Popform;
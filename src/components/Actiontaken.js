import React,{useState} from 'react'
import app from '../firebase';
import {getDatabase, ref,update} from "firebase/database";
import { storage } from '../firebase';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./Login.css";


function Actiontaken( {setOpenModal2}) {
  const [Actiontaken, setActiontaken]= useState("");
  const[image,setimage]= useState('');

  console.log(window.localStorage.getItem("complaintadmin"));
  let temp=window.localStorage.getItem("complaintadmin");
  const handleSubmit = (e) =>{
    e.preventDefault();
    setOpenModal2(false);

    update(ref(getDatabase(app),'RaisedComplaints/'+window.sharedData.ComplaintID+window.localStorage.getItem("complaintadmin")),
    {
      ActionTaken: Actiontaken,
      Status:"Completed",
      Delete:"YES"
    })
    .then(()=>{
      console.log("Done");
    })
    if(image == null){
      return null;
    }
    else{
      const imageref = storage.ref('Actiontaken/'+temp).put(image)
      .on("state_changed",console.log(null),alert);
      imageref();
    }
    

  //   db.collection("Complaints").where("Complaint", "==", window.sharedData.Complaint).get() 
  // .then(querySnapshot => {
  //   querySnapshot.forEach(doc => {
  //     doc.ref.update({ 
  //       ActionTaken: Actiontaken,
  //       Status: "Completed",
  //       Delete: "YES"
  //     });
  //   });
  //   if(image == null)
  //   return;
  //   const imageref = storage.ref('Actiontaken/'+window.sharedData.Complaint).put(image)
  //   .on("state_changed",alert("Success"),alert);
  //   imageref();
  //   alert("Case Closed");
  // })
  // .catch(error => {
  //   console.log("Error getting documents: ", error);
  // });
  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button className="close"
            onClick={() => {
              setOpenModal2(false);
            }}
          >
            <i className="fas fa-close"></i>
          </button>
        </div>
        <div className="title">
          <h1>Action Taken</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="compform">
          <textarea rows="5" cols="42" placeholder='Type Here' value={Actiontaken} onChange={(e)=> setActiontaken(e.target.value)} required></textarea><br></br><br></br>
          <input type="file" id="file" onChange={(e) => {setimage(e.target.files[0])}} ></input><br></br>
          <label className="redhover" for="file"><i className="fas fa-image"></i>{image === ""?"Insert an Image":"Image Inserted"}</label><br></br><br></br>
        
          <button className="buttonreg"
            onClick={() => {
              setOpenModal2(false);
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

export default Actiontaken
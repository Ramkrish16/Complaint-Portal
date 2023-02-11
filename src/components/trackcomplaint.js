import React, { useState } from 'react'
import { storage } from '../firebase';
import app from '../firebase';
import { getDatabase,get,child,ref as Ref} from "firebase/database";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./temp.css";

let globtrack;


    function Trackcomplaint({ setOpenModal1 }) {
      const[image]= useState('');
      let trackid;trackid=window.sharedData.email;globtrack=trackid;
      
        const [data,setdata]=useState([]);
        const dbref=Ref(getDatabase(app));


        get(child(dbref,'RaisedComplaints/')).then((snapshot)=>{
            let comp=[]; 
            snapshot.forEach(snap => {
              if(snap.val().Email === globtrack){
                comp.push(snap.val());
                }
            })
            setdata(comp)
          })

    
    const showsol = (index,e) =>{
      if(image == null)
      return;
          storage.ref("Actiontaken/").child(data[index].Complaint).getDownloadURL()
          .then((url) => {      
          console.log(url);
          window.location.assign(url)           
          })        
  }
      
  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        <div className="titleCloseBtn">
      
          <button className='close'
            onClick={() => {
              setOpenModal1(false);
            }}
          >
            <i className="fas fa-close"></i>
          </button>
          </div>
          <div>
            <table id="customers">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Complaint</th>
                        <th>Status</th>
                        <th>Action Taken</th>
                        <th>Solution Image</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((data,index)=>(
                        <tr key={data.id}>
                        <td>{data.name}</td>
                        <td>{data.ID}</td>
                        <td>{data.Complaint}</td>
                        <td>{data.Status}</td>
                        <td>{data.Status === "Pending"? "Pending":data.ActionTaken}</td>
                        <button className='button10' onClick={(e)=>{showsol(index,e)}} disabled={data.Status === "Completed"? false:true}>Show Solution</button>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
          </div>
        </div>

  );
}

export default Trackcomplaint;
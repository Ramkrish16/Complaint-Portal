import React, { useState } from 'react'
import Actiontaken from './Actiontaken';
import { storage } from '../firebase';
import app from '../firebase';
import logo from './image/logo.png';
import { getDatabase,get,child,ref as Ref} from "firebase/database";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";



    function Adminhome() {
      
      const [modalOpen2, setModalOpen2] = useState(false);const[image]= useState('');const [data,setdata]=useState([]);const { logOut } = useUserAuth();
      if(window.localStorage.getItem("dummy") === "1")
      {
        const dbref=Ref(getDatabase(app));
        get(child(dbref,'RaisedComplaints/')).then((snapshot)=>{
          let comp=[];
          snapshot.forEach(snap => {
            if(snap.val().Delete === 'YES'){
            comp.push(snap.val());
            }
          })
          setdata(comp)
        })
      }
      else
      {
        const dbref=Ref(getDatabase(app));
        get(child(dbref,'RaisedComplaints/')).then((snapshot)=>{
          let comp=[];
          snapshot.forEach(snap => {
            if(snap.val().Delete === 'NO'){
              comp.push(snap.val());
              }
          })
          setdata(comp)
        })
      }


const changestatus=(index,e)=>
{
  setModalOpen2(true);
  e.target.innerHTML="Completed";
  e.target.disabled=true;
  var x = document.getElementById("status");
  x.innerHTML="Completed"
  window.sharedData = { Complaintadmin: data[index].Complaint};
  window.localStorage.setItem("complaintadmin",data[index].Complaint)
  window.sharedData = { ComplaintID: data[index].ComplaintID};
}


const showsol = (index,e) =>{
  if(image == null)
  return;
      storage.ref("complaints/").child(data[index].Complaint).getDownloadURL()
      .then((url) => {      
      console.log(url);
      window.location.assign(url)           
      })        
}

const hide = () =>{
  if(window.localStorage.getItem("dummy") === "1"){
    window.localStorage.clear();
    window.location.reload();
  }
  else{
    window.localStorage.setItem("dummy","1")
    window.location.reload();
  }

}

const ref = () =>{
  window.location.reload();
}

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
            <li><a href='#a' onClick={hide}>{window.localStorage.getItem("dummy") === "1"? "Hide Completed Complaints":"Show All Complaints"}</a></li> 
            <li><a href='#a' onClick={ref}>Refresh</a></li>
            <li><a href='#a' onClick={handleLogout}>Logout</a></li> 
         </ul>
      </nav>
      </div>
    <div className='center'>
            <table id="customers">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Complaint</th>   
                        <th>Image</th>  
                        <th>Status</th>
                        <th>Action</th>     
                    </tr>
                </thead>
                <tbody>
                    {data.map((data,index)=>(
                        <tr key={data.id}>
                        <td>{data.name}</td>
                        <td>{data.ID}</td>
                        <td>{data.Email}</td>
                        <td>{data.Complaint}</td>
                        <button className='button10' onClick={(e)=>{showsol(index,e)}}>Complaint img</button>
                        <td id="status">{data.Status}</td>
                        <button className='button11' onClick={(e)=>{changestatus(index,e)}} disabled={data.Status === "Completed"? true:false}>{data.Status === "Completed"? "Completed":"Mark as Complete" }</button>
                        
                        </tr>
                    ))}
                </tbody>
            </table>
            {modalOpen2 && <Actiontaken setOpenModal2={setModalOpen2} />}
          </div>
          </body>
</html>

  );
}





export default Adminhome;
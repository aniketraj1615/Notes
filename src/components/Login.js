import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
export default function Login(props) {
  const navigate=useNavigate();
    const[credentils,setCredentils]=useState({email:"",password:""});
    const handleSubmit=async(e)=>{
e.preventDefault();

const response = await fetch("http://localhost:3002/api/auth/login", {
    method: "POST",
    
    headers: {
      "Content-Type": "application/json",
     
      
    }
    ,
      body: JSON.stringify({email:credentils.email ,password:credentils.password })
    
  });
  const json=await response.json()
  console.log(json);
  if(json.success){
    //redirect
    localStorage.setItem('token',json.authtoken);
    navigate("/");
    props.showAlert("Logged in Successfully","success")
  }

  else{
    // alert("invalid credentials");
    props.showAlert("Invalid Details","danger")

  }
  
    }
    const onChange=(e)=>{
      setCredentils({...credentils,[e.target.name]:e.target.value})
        }
  return (
    <div>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label for="email"  className="form-label">Email address</label>
    <input type="email" value={credentils.email} className="form-control" onChange={onChange} id="email"name="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="password" className="form-label">Password</label>
    <input type="password" value={credentils.password} onChange={onChange} className="form-control" name="password" id="password"/>
  </div>
 
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

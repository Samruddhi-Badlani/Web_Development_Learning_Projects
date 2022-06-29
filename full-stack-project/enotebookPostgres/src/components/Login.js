import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = (props) => {

    const [creds, setCreds] = useState({email:"",password:""});

    let history = useNavigate();

    const onChange = (e)=> {
        setCreds({...creds,
        [e.target.name] : e.target.value});
    }


    

    const handleSubmit = async (e) =>{
        e.preventDefault();
        let url = `http://localhost:5000/api/auth/login`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body : JSON.stringify({email:creds.email,password:creds.password})
          });
      
          const json =  await response.json();
          console.log(json);

          if(json.success){

            localStorage.setItem('token',json.authToken);
            localStorage.setItem('token2',json.authToken2);
            props.showAlert(`Successfully Logged In`,'success');
            history('/');

          }
          else{
            props.showAlert(`Invalid Credentials ${json.error}`,'danger');

          }

    }
  return (
    <div>
      <div className="mt-2 my-2">
        <h2>Login to use your enotebook </h2>

     
      <form  onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" value={creds.email} name='email' onChange={onChange} aria-describedby="emailHelp" />
   
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={creds.password} id="password" name='password' onChange={onChange} />
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
      
    </div>
  )
}

export default Login

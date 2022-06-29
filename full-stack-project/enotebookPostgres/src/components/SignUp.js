import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router';

const SignUp = (props) => {

    const [creds, setCreds] = useState({email:"",password:"",cpassword:"",name:""}); 
    const onChange = (e)=> {
        setCreds({...creds,
        [e.target.name] : e.target.value});
    }

    let history = useNavigate();
    const handleSubmit = async (e) =>{

        e.preventDefault();

        const {name,email,password,cpassword} = creds ;

        if(password !== cpassword){
            props.showAlert(`Passwords do not match`,'danger');
            return 

        }
        e.preventDefault();
        let url = `http://localhost:5000/api/auth/createuser`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body : JSON.stringify({name,email,password})
          });
      
          const json =  await response.json();
          console.log(json);

          if(json.success){

            localStorage.setItem('token',json.authToken);
            props.showAlert(`Successfully Created Account`,'success');
            history('/');
            

          }
          else{
            props.showAlert(`Invalid Credentials ${json.error}`,'danger');
          }

    }
  return (
    <div>
      <div className="mt-2 my-2">
        <h2>Create an account </h2>
     <form onSubmit={handleSubmit}>
     <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" onChange={onChange} id="name" name='name' required minLength={5} />
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={onChange} id="email" name='email' aria-describedby="emailHelp" required />
    
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onChange} name='password' id="password" required minLength={5} />
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" onChange={onChange} name='cpassword' id="cpassword" required minLength={5} />
  </div>

  <button type="submit" className="btn btn-primary">Sign Up</button>
</form>
</div>
    </div>
  )
}

export default SignUp

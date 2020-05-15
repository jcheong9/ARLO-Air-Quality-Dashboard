import React, { useState } from 'react';
import Header from '../components/Header';

const SignUpPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            alert("Passwords do not match");
            return;
        }
        fetch('http://ec2-34-216-137-71.us-west-2.compute.amazonaws.com:5000/signup', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({
                "first_name": firstName,
                "last_name": lastName,
                "email": email,
                "password": password
            })
        })
        .then(res => {
          if(res.status === 409){
            alert("Email is already registered to a user")
            return;
          }
          if(res.status === 200){
            return window.location.href = '/dashboard'; 
          }
        })
        .catch((error) => console.log(error))
    }
    return (
        <div>
            <Header />
            <div className="container">
                <div className="row h-100">
                    <div className="col-sm-12 my-auto">
                        <h3 className="page_title">Sign Up</h3>
                        <form>
                        <label className="form_label" htmlFor="name">First Name</label>
                        <input className="form_input" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        <label className="form_label" htmlFor="name">Last Name</label>
                        <input className="form_input" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                        <label className="form_label" htmlFor="name">Email</label>
                        <input className="form_input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        <label className="form_label" htmlFor="name">Password</label>
                        <input className="form_input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        <label className="form_label" htmlFor="name">Confirm Password</label>
                        <input className="form_input" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                        <p className="text-danger text-center"> {errorMsg} </p>
                        <button className="btn btn-primary btn-block" type="submit" onClick={handleSubmit}>Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
  
}

export default SignUpPage;
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
        setErrorMsg("");
        if(password !== confirmPassword) {
            setErrorMsg("Passwords do not match");
        } 
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
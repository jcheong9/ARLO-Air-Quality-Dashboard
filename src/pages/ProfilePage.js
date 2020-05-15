import React, { useState } from 'react';
import Header from '../components/Header';

const ProfilePage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://127.0.0.1:5000/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({
                "username": this.username.current.value,
                "password": this.password.current.value
            })
        })
        .then(res => res.json())
        .then((data) => {
            
        })
        .catch(err => {
            console.log(err);
        });
    }
    return (
        <div>
            <Header />
            <div className="container">
                <div className="row h-100">
                    <div className="col-sm-12 my-auto">
                        <h3 className="page_title">Profile</h3>
                        <form>
                        <label className="form_label" htmlFor="name">First Name</label>
                        <label className="form_label_2" htmlFor="name"></label>
                        <label className="form_label" htmlFor="name">Last Name</label>
                        <label className="form_label_2" htmlFor="name"></label>
                        <label className="form_label" htmlFor="name">Email</label>
                        <label className="form_label_2" htmlFor="name"></label>
                        <p className="text-danger text-center"> {errorMsg} </p>
                        <button className="btn btn-primary btn-block" type="submit" onClick={handleSubmit}>Refresh</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
  
}

export default ProfilePage;
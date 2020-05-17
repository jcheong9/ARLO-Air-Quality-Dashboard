import React, { useState } from 'react';
import Header from '../components/Header';
import Cookies from 'js-cookie';

const ProfilePage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleCopy = (e) => {
        e.preventDefault();
        let textarea = document.getElementById("token_label");
        textarea.select();
        document.execCommand("copy");
    }
    const getProfile = () => {
        fetch('http://ec2-34-216-137-71.us-west-2.compute.amazonaws.com:5000/profile', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({
            "username": Cookies.get('user')
        })
    })
    .then(res => res.json())
    .then((data) => {
        document.getElementById("fName_label").innerHTML = data.firstname
        document.getElementById("lName_label").innerHTML = data.lastname
        document.getElementById("email_label").innerHTML = data.email
        document.getElementById("token_label").innerHTML = data.token
    })
    .catch(err => {
        console.log(err);
    });
    }
    
    if(Cookies.get('user') == undefined)
        return window.location.href = '/'
    else
        getProfile()
    
    return (
        <div>
            <Header />
            <div className="container">
                <div className="row h-100">
                    <div className="col-sm-12 my-auto">
                        <h2 className="page_title">Profile</h2>
                        <div>
                            <h4 className="form_label" htmlFor="name">First Name</h4>
                            <p className="form_label_2" id="fName_label" htmlFor="name"></p>

                            <h4 className="form_label" htmlFor="name">Last Name</h4>
                            <p className="form_label_2" id="lName_label" htmlFor="name"></p>

                            <h4 className="form_label" htmlFor="name">Email</h4>
                            <p className="form_label_2" id="email_label" htmlFor="name"></p>

                            <h4 className="form_label" htmlFor="name">Access Token</h4>
                            <textarea className="profile_token_text" id="token_label" htmlFor="name"></textarea>
                            <button className="btn btn-primary" type="submit" onClick={handleCopy}>Copy Token</button>
                        <p className="text-danger text-center"> {errorMsg} </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  
}

export default ProfilePage;
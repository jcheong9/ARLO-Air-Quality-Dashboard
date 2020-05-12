import React from 'react';
import Header from '../components/Header';
import Login from '../components/Login';
import { Link } from "react-router-dom"

const LoginPage = () => {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="row h-100">
                    <div className="col-sm-12 my-auto">
                        <Login/>
                        <span> Don't have an account yet? &nbsp; </span> <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
  
}

export default LoginPage;
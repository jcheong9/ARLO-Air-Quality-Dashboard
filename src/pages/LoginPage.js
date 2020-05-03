import React from 'react';
import Header from '../components/Header';
import Login from '../components/Login';

const NotFoundPage = () => {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="row h-100">
                    <div className="col-sm-12 my-auto">
                        <Login/>
                    </div>
                </div>
            </div>
        </div>
    );
  
}

export default NotFoundPage;
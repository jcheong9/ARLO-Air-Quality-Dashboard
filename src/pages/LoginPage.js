import React, { Component } from "react";
import Header from '../components/Header';
import AlertDismissible from '../components/AlertDismissible';
import Login from '../components/Login';
import { Link } from "react-router-dom"
import Cookies from 'js-cookie';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
    }
    componentDidMount () {
        if(Cookies.get('token') != null){
            this.child.current.getAlert();
        }
    }

    render() {
        return (
            <div>
            <Header />
            <AlertDismissible ref={this.child} />
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
}

export default LoginPage;
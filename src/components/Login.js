
import React, { Component } from "react";
import Cookies from 'js-cookie';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { username: "", password: "" };
        this.username = React.createRef();
        this.password = React.createRef();
    }
    handleSubmit(event){
        event.preventDefault();
        fetch('http://ec2-34-216-137-71.us-west-2.compute.amazonaws.com:5000/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({
                "username": this.username.current.value,
                "password": this.password.current.value
            })
        })
        .then(res => {
          if(res.status === 401){
            alert("Wrong password!");
          }
          if(res.status === 200){
            return res.json();
          }
        })
        .then((data) => {
            Cookies.set('token', data.token)
            return window.location.href = '/dashboard'; 
        })
        .catch((error) => console.log(error))
    }

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="formHide">
        <h3 className="page_title">Sign In</h3>
        <div className="form-group">
          <label htmlFor="email">Username</label>
          <input name="username"  className="form-control" type="text" ref={this.username} placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Password</label>
          <input
            className="form-control"
            name="password"
            type="password"
            ref={this.password}
            placeholder="Enter your password"
          />
        </div>
        <button className="btn btn-primary btn-block" type="submit"  >
          Login
        </button>
      </form>
    );
  }
}

export default Login;
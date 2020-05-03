
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
        fetch('http://127.0.0.1:5000/login', {
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
            console.log("everything is good")
            console.log(res.body.token)
            return res.json();
          }
        })
        .then((data) => {
            console.log(data)
            Cookies.set('token', data.token)

        })
        .catch((error) => console.log(error))
    }

  render() {
    return (
            <form onSubmit={this.handleSubmit} id="formHide">
              <label htmlFor="email">Email</label>
              <input name="username" type="text" ref={this.username} placeholder="Enter your email" />
    
              <label htmlFor="email">Password</label>
              <input
                name="password"
                type="password"
                ref={this.password}
                placeholder="Enter your password"
              />
              <button  type="submit"  >
                Login
              </button>
            </form>

    );
  }
}

export default Login;
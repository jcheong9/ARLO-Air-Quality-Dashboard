
import React, { Component } from "react";

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { username: "", password: "" };
        this.username = React.createRef();
        this.password = React.createRef();
    }
    // action="http://127.0.0.1:5000/login" method="POST"
    handleSubmit(event){
        event.preventDefault();
        fetch('http://127.0.0.1:5000/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "username": this.username.current.value,
                "password": this.password.current.value
            })
        })
        .then(res => {
          if(res.status === 401){
            alert("Wrong password!");
          }
        }
          )
        .then((data) => {
            console.log(data)
            //this.props.history.push("/");
        })
        .catch((error) => console.log(error))
    }

  render() {
    // action="http://127.0.0.1:5000/login" method="POST"
    // onclick="window.location.href = 'http://localhost:3000/';"
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
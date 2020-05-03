
import React, { Component } from "react";

class Protect extends Component {
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
        let tokenLocal = localStorage.getItem('token')
        console.log(tokenLocal)
        console.log(`http://127.0.0.1:5000/protected?token=${tokenLocal}`)
        fetch(`http://127.0.0.1:5000/protected?token=${tokenLocal}`, {
            method: 'get',

        })
        .then(res => {
          if(res.status === 200){
            console.log("protect execute")
          }
        }
          )
        .then((data) => {
            console.log(data)
        })
        .catch((error) => console.log(error))
    }

  render() {
    return (
            <form onSubmit={this.handleSubmit}>
              <button  type="submit"  >
                protect
              </button>
            </form>

    );
  }
}

export default Protect;
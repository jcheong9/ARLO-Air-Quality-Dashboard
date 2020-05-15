import React, { Component } from "react";
import '../css/header.css'
class Header extends Component {

  render() {
    return (
      <div className="header-container jumbotron">
        <h2 className="header">ARLO Air Quality Dashboard</h2>
        <button className="header_swagger btn-btn-link"><a href="http://ec2-34-216-137-71.us-west-2.compute.amazonaws.com:5000/swagger/"> Swagger </a></button>
      </div>
    );
  }
}

export default Header
import React, { Component } from "react";
import '../css/header.css'
class Header extends Component {

  render() {
    return (
      <div className="header-container jumbotron">
        <h2 className="header">ARLO Air Quality Dashboard</h2>
      </div>
    );
  }
}

export default Header
import React, { Component } from "react";
import '../css/header.css'
import config from '../config'
import  { Link } from 'react-router-dom'
class Header extends Component {

  render() {
    return (
      <div className="header-container jumbotron">
        <h2 className="header">ARLO Air Quality Dashboard</h2>
        <button className="header_swagger btn-btn-link"><a href={`${config.API_ADDRESS}/swagger/`}> Swagger </a></button>
        <button className="ml-5" onClickclassName="header_swagger btn-btn-link">
          <Link to="/profile">Profile</Link>
        </button>
      </div>
    );
  }
}

export default Header
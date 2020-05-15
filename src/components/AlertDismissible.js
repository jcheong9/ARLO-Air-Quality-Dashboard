import React, { Component } from "react";
import { Alert } from 'react-bootstrap';

class AlertDismissible extends Component{
    constructor(props, context) {
        super(props, context);
    
        this.handleDismiss = this.handleDismiss.bind(this);
        this.state = {
          show: false
        };
      }
      
      handleDismiss() {
        this.setState({ show: false });
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      }
      getAlert() {
       this.setState({ show: true})   
    }

    render(){
        if (this.state.show) {
          return (
            <Alert variant="danger" onClose={this.handleDismiss} dismissible>
              <Alert.Heading>Token Expired!</Alert.Heading>
              <p>
              Please Login Again.
              </p>
            </Alert>
          );
        }
        return <p></p>;

    }
}
export default AlertDismissible;
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
      }
      getAlert() {
       this.setState({ show: true})   
    }

    render(){
        if (this.props.show) {
          return (
            <Alert variant="danger" onDismiss={this.handleDismiss} dismissible>
              <Alert.Heading>Invalid Token!</Alert.Heading>
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
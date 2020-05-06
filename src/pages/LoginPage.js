import React, { Component } from "react";
import Header from '../components/Header';
import AlertDismissible from '../components/AlertDismissible';
import Login from '../components/Login';
import Cookies from 'js-cookie';

// class AlertDismissibleExample extends Component{
//     render(){
//         if (this.props.valueFromParent) {
//           return (
//             <Alert variant="danger" dismissible>
//               <Alert.Heading>Invalid Token!</Alert.Heading>
//               <p>
//               Please Login Again.
//               </p>
//             </Alert>
//           );
//         }
//         return <p></p>;

//     }
// }

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        // this.state = {
        //     stateAlertError: false
        // }
    }
    componentDidMount () {
        // this.state.stateAlertError = this.props.location.state.email
        if(Cookies.get('token') != null){
            //this.setState({stateAlertError: this.props.location.state.stateAlertError})
            this.child.current.getAlert();
        }
    }
    // valueFromParent={this.state.stateAlertError}
    render() {
        return (
            <div>
                <Header />
                <AlertDismissible ref={this.child}  />
                <div className="container">
                    <div className="row h-100">
                        <div className="col-sm-12 my-auto">
                            <Login/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;
import React, { Component } from 'react';
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import SignupPage from './pages/SignUpPage'
import ProfilePage from './pages/ProfilePage'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom"

class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={LoginPage}/>
                    <Route exact path="/signup" component={SignupPage}/>
                    <Route exact path="/dashboard" component={DashboardPage}/>
                    <Route exact path="/profile" component={ProfilePage}/>
                    <Route exact path="/404" component={NotFoundPage}/>
                    <Redirect to="/404"/>
                </Switch>
            </Router>
        );
    }

}

export default App;
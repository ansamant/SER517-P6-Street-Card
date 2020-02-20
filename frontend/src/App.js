import React from 'react';
import './App.css';
import LandingPage from './LandingPage';
import Login from './Login';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Registration from './Registration'


export default class App extends React.Component {


  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }


  checkLoginStatus() {
      if(localStorage.getItem('access_token') && localStorage.getItem('refresh_token')) {

        this.setState({
            loggedInStatus: "LOGGED_IN"
          });
      }
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  componentDidMount() {
   // this.checkLoginStatus();
  }

   handleLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    });    
  }



  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={"/"}
              render={props => (
                <LandingPage
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route
              exact
              path={"/login"}
              render={props => (
                <Login
                  {...props}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route
              exact
              path={"/socialWorkerRegister"}
              render={props => (
                <Registration
                  {...props}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

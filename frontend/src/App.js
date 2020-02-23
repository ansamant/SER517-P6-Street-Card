import React from 'react';
import './App.css';
import LandingPage from './LandingPage';
import Login from './Login';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Registration from './Registration'
import HomelessRegistration from './HomelessRegistration'


export default class App extends React.Component {


  constructor() {
    super();

    this.state = {
      loggedInStatus: localStorage.getItem('token') ? "LOGGED_IN" : "NOT_LOGGED_IN",
      username: '',
      homelessPersonId: 0,
      homelessData: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleHomelessPersonId = this.handleHomelessPersonId.bind(this);
    this.handleHomelessPersonData = this.handleHomelessPersonData.bind(this);
  }


  checkLoginStatus() {
      if(localStorage.getItem('access_token') && localStorage.getItem('refresh_token')) {

        this.setState({
            loggedInStatus: "LOGGED_IN"
          });
      }
  }

  handleLogout() {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
  }


   handleLogin(json,user_name) {
     localStorage.setItem('token', json.access);
     localStorage.setItem('refresh_token', json.refresh);
     console.log(user_name);
     this.setState({ 
              username: user_name,
              loggedInStatus: "LOGGED_IN"
            });
     console.log(this.state.username);
     console.log(this.state.loggedInStatus);
  }

  handleHomelessPersonId(person_id){
      this.setState({ 
              homelessPersonId: person_id
            });
  }

  handleHomelessPersonData(data){
    console.log("data",data);
   
      this.setState({ 
              homelessData: data
            });
      console.log(this.state.homelessData);
    
      
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
                />
              )}
            />
            <Route
              exact
              path={"/socialWorkerRegister"}
              render={props => (
                <Registration
                  {...props}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                  handlUser={this.handlUser}
                  username={this.state.username}
                  homelessPersonId={this.state.homelessPersonId}
                  handleHomelessPersonData={this.handleHomelessPersonData}
                />
              )}
            />
            <Route
              exact
              path={"/homelessRegistration"}
              render={props => (
                <HomelessRegistration
                  {...props}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                  handlUser={this.handlUser}
                  username ={this.state.username}
                  handleHomelessPersonId={this.handleHomelessPersonId}
                  homelessData={this.state.homelessData}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

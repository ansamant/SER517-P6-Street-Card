import React from 'react';
import './App.css';
import LandingPage from './LandingPage';
import Login from './Login';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Registration from './Registration';
import HomelessRegistration from './HomelessRegistration';


const PrivateRoute = ({ component: Component, loggedInStatus: loggedInStatus, ...rest }) => (
  <Route render={(props) => (
    loggedInStatus === "LOGGED_IN"
      ? <Component 
          {...props}
          {...rest}
        />
      : <Redirect to='/login' />

  )} />


)
export default class App extends React.Component {


  constructor() {
    super();

    this.state = {
      loggedInStatus: localStorage.getItem('token') ? "LOGGED_IN" : "NOT_LOGGED_IN",
      username: '',
      homelessPersonId: 0
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleHomelessPersonId = this.handleHomelessPersonId.bind(this);
    this.handleHomelessPersonData = this.handleHomelessPersonData.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
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

isEmpty(object) {
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}
  handleHomelessPersonData(personId){
    if(personId){
      console.log("data kadam",personId);
       this.setState({ 
              homelessPersonId: personId
            });
    }else{
      
       this.setState({ 
              homelessPersonId: ''
            });
    }  
      
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
            <PrivateRoute
              exact
              path={"/socialWorkerRegister"}
              component={Registration}
              handleLogout={this.handleLogout}
              loggedInStatus={this.state.loggedInStatus}
              username={this.state.username}
              handleHomelessPersonData={this.handleHomelessPersonData}
              handleLogin={this.handleLogin}
            />
            <PrivateRoute
              exact
              path={"/homelessRegistration"}
              component={HomelessRegistration}
              handleLogout={this.handleLogout}
              loggedInStatus={this.state.loggedInStatus}
              handlUser={this.handlUser}
              username ={this.state.username}
              handleHomelessPersonId={this.handleHomelessPersonId}
              homelessPersonId={this.state.homelessPersonId}
              handleLogin={this.handleLogin}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

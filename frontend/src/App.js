import React from 'react';
import './App.css';
import LandingPage from './LandingPage';
import Login from './Login';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Registration from './Registration';
import HomelessRegistration from './HomelessRegistration';
import WrappedLogTable from './LogView';
import WrappedGreeterForm from './GreeterView';
import SocialWorker from './SocialWorker';
import LogView from './LogView';
import SetAppointments from './SetAppointments'
import EditAppointment from './EditAppointment'
import ViewAppointmentsTable from './ViewAppointmentTable'
import enrollmentForm from './component/enrollmentForm'
import ClientLanding from './ClientLanding'
import ClientPersonalInfo from "./ClientPersonalInfo";

const PrivateRoute = ({ component: Component, loggedInStatus: loggedInStatus, ...rest }) => (
  <Route render={(props) => (
    loggedInStatus === "LOGGED_IN"
      ? <Component 
          {...props}
          {...rest}
          loggedInStatus ={loggedInStatus}
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
      homelessPersonId: 0,
      homelessData:{},
      pageComponent: 'registerClient'
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleHomelessPersonId = this.handleHomelessPersonId.bind(this);
    this.handleHomelessPersonData = this.handleHomelessPersonData.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
    this.method = this.method.bind(this);
    this.updateAppointmentId = this.updateAppointmentId.bind(this);
    this.handleHomelessPersonJson = this.handleHomelessPersonJson.bind(this);
    this.updatePageComponent=this.updatePageComponent.bind(this);
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

  method(clearanceLevel,serviceProvider) {
    console.log("method");
    console.log(clearanceLevel);
    console.log(serviceProvider);
     this.setState({ 
              clearanceLevel: clearanceLevel,
              serviceProvider: serviceProvider
            });
     console.log(this.state.clearanceLevel);
     console.log(this.state.serviceProvider);
  }


   handleLogin(json,user_name) {
     localStorage.setItem('token', json.access);
     localStorage.setItem('refresh_token', json.refresh);
     console.log(user_name);
     this.setState({ 
              username: user_name,
              loggedInStatus: "LOGGED_IN"
            });

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

  handleHomelessPersonJson(json){
    console.log(json)
     this.setState({ 
              homelessData: json
            });
  }

  updateAppointmentId(appointmentId){
    this.setState({ 
              appointmentId: appointmentId
            });
  }

  updatePageComponent(pageComponent){
    this.setState({ 
              pageComponent: pageComponent
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
                  clearanceLevel={this.state.clearanceLevel}
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
              clearanceLevel={this.state.clearanceLevel}
              handleHomelessPersonId={this.handleHomelessPersonId}
              handleHomelessPersonJson={this.handleHomelessPersonJson}
              pageComponent={this.state.pageComponent}
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
              homelessData={this.state.homelessData}
              updatePageComponent={this.updatePageComponent}
            />
            <PrivateRoute 
             exact 
            path={"/log"} 
            component={LogView}
            loggedInStatus={this.state.loggedInStatus}
            handleHomelessPersonId={this.state.homelessPersonId}
            handleLogout={this.handleLogout}
            updatePageComponent={this.updatePageComponent}
            />
            <PrivateRoute 
              exact 
              path={"/greeter"} 
              component={WrappedGreeterForm}
              clearanceLevel ={this.state.clearanceLevel}
              username ={this.state.username}
              loggedInStatus={this.state.loggedInStatus}
              clearanceLevel={this.state.clearanceLevel}
              serviceProvider={this.state.serviceProvider}
              handleLogout={this.handleLogout}
            />
            <PrivateRoute 
              exact 
              path={"/social"} 
              component={SocialWorker}
              clearanceLevel ={this.state.clearanceLevel}
              username ={this.state.username}
              loggedInStatus={this.state.loggedInStatus}
              serviceProvider={this.state.serviceProvider}
              method={this.method}
            />
            <PrivateRoute 
              exact 
              path={"/createAppointment"} 
              component={SetAppointments}
              loggedInStatus={this.state.loggedInStatus}
              //homelessPersonId={this.handleHomelessPersonId}
              homelessPersonId={this.state.homelessPersonId}
              handleLogout={this.handleLogout}
              updatePageComponent={this.updatePageComponent}
            />
            <PrivateRoute 
              exact 
              path={"/editAppointment"} 
              component={EditAppointment}
              loggedInStatus={this.state.loggedInStatus}
              homelessPersonId={this.state.homelessPersonId}
              handleLogout={this.handleLogout}
              appointmentId={this.state.appointmentId}
              updatePageComponent={this.updatePageComponent}
            />
            <PrivateRoute 
              exact 
              path={"/viewAppointment"} 
              component={ViewAppointmentsTable}
              loggedInStatus={this.state.loggedInStatus}
              homelessPersonId={this.state.homelessPersonId}
              handleLogout={this.handleLogout}
              updateAppointmentId={this.updateAppointmentId}
              updatePageComponent={this.updatePageComponent}
            />
             <PrivateRoute
              exact
              path={"/enrollment"}
              component={enrollmentForm}
              loggedInStatus={this.state.loggedInStatus}
              homelessPersonId={this.state.homelessPersonId}
              handleLogout={this.handleLogout}
              updatePageComponent={this.updatePageComponent}
            />
            <PrivateRoute 
              exact 
              path={"/clientLanding"}
              component={ClientLanding}
              username ={this.state.username}
              loggedInStatus={this.state.loggedInStatus}
              clearanceLevel={this.state.clearanceLevel}
              serviceProvider={this.state.serviceProvider}
              handleLogout={this.handleLogout}
              handleHomelessPersonJson={this.handleHomelessPersonJson}
            />
            <PrivateRoute
              exact
              path={"/clientInfo"}
              component={ClientPersonalInfo}
              username ={this.state.username}
              loggedInStatus={this.state.loggedInStatus}
              clearanceLevel={this.state.clearanceLevel}
              serviceProvider={this.state.serviceProvider}
              homelessPersonId={this.state.handleHomelessPersonId}
              handleLogout={this.handleLogout}
              homelessData={this.state.homelessData}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

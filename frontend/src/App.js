import React from 'react';
import './App.css';
import LandingPage from './LandingPage';
import Login from './Login';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Registration from './Registration';
import HomelessRegistration from './HomelessRegistration';
import LogView from './LogView';
import WrappedGreeterForm from './GreeterView';
import WrappedServiceProvider from './ServiceProvider';
import SocialWorker from './SocialWorker';
import SetAppointments from './SetAppointments'
import EditAppointment from './EditAppointment'
import ViewAppointmentsTable from './ViewAppointmentTable'
import enrollmentForm from './enrollmentForm'
import viewAllEnrollment from './viewAllEnrollment'
import viewEnrollmentDetails from './viewEnrollmentDetails'
import ClientLanding from './ClientLanding'
import ClientPersonalInfo from "./ClientPersonalInfo";
import Transaction from "./Transaction"
import SuccessfulRegistration from "./SuccessfulRegistration";
import LoginError from "./LoginError";
import ForgotPasswordForm from "./ForgotPassword";
import SuccessfulUpdate from "./SuccessfulUpdate";
import TransactionComplete from "./TransactionComplete";
import AddProductSuccess from "./AddProductSuccess";
import UpdateSocialWorkerInfoForm from "./UpdateSocialWorkerInfo";
import SuccessfulSocialRegistration from "./SuccessfulSocialRegistration"

const PrivateRoute = ({component: Component, loggedInStatus: loggedInStatus, ...rest}) => (
    <Route render={(props) => (
        loggedInStatus === "LOGGED_IN"
            ? <Component
                {...props}
                {...rest}
                loggedInStatus={loggedInStatus}
            />
            : <Redirect to='/login'/>

    )}/>


)
export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            loggedInStatus: localStorage.getItem('token') ? "LOGGED_IN" : "NOT_LOGGED_IN",
            username: '',
            homelessPersonId: 0,
            homelessData: {},
            homelessInventoryData: [],
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
        this.updatePageComponent = this.updatePageComponent.bind(this);
        this.inputEnrollmentId = this.inputEnrollmentId.bind(this);
        this.inputPersonalId = this.inputPersonalId.bind(this);
        this.handleHomelessPersonInventoryJson = this.handleHomelessPersonInventoryJson.bind(this)
        this.handleUpdateSocialWorkerInfoJSON = this.handleUpdateSocialWorkerInfoJSON.bind(this)
    }


    checkLoginStatus() {
        if (localStorage.getItem('access_token') && localStorage.getItem('refresh_token')) {

            this.setState({
                loggedInStatus: "LOGGED_IN"
            });
        }
    }

    handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
    }

    method(clearanceLevel, serviceProvider) {

        this.setState({
            clearanceLevel: clearanceLevel,
            serviceProvider: serviceProvider
        });


    }


    handleLogin(json, user_name) {
        localStorage.setItem('token', json.access);
        localStorage.setItem('refresh_token', json.refresh);

        this.setState({
            username: user_name,
            loggedInStatus: "LOGGED_IN"
        });

    }

    handleHomelessPersonId(person_id) {
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

    handleHomelessPersonData(personId) {
        if (personId) {

            this.setState({
                homelessPersonId: personId
            });
        } else {
            this.setState({
                homelessPersonId: ''
            });
        }
    }

    handleHomelessPersonJson(json) {
        this.setState({
            homelessData: json
        });
    }

    handleHomelessPersonInventoryJson(json) {
        this.setState({
            homelessInventoryData: json
        });
    }

    updateAppointmentId(appointmentId) {
        this.setState({
            appointmentId: appointmentId
        });
    }

    inputEnrollmentId(enrollmentId) {
        this.setState({
            enrollmentId: enrollmentId
        });
    }

    updatePageComponent(pageComponent) {
        this.setState({
            pageComponent: pageComponent
        });
    }

    inputPersonalId(personalId) {
        this.setState({
            homelessPersonId: personalId
        })
    }

    handleUpdateSocialWorkerInfoJSON(json) {

        this.setState({
            socialWorkerInfoJSON: json
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
                            handleUpdateSocialWorkerInfoJSON={this.handleUpdateSocialWorkerInfoJSON}
                        />
                        <PrivateRoute
                            exact
                            path={"/updateSocialWorkerInfo"}
                            component={UpdateSocialWorkerInfoForm}
                            handleLogout={this.handleLogout}
                            loggedInStatus={this.state.loggedInStatus}
                            username={this.state.username}
                            updatePageComponent={this.updatePageComponent}
                            handleHomelessPersonData={this.handleHomelessPersonData}
                            handleLogin={this.handleLogin}
                            clearanceLevel={this.state.clearanceLevel}
                            handleHomelessPersonId={this.handleHomelessPersonId}
                            handleHomelessPersonJson={this.handleHomelessPersonJson}
                            pageComponent={this.state.pageComponent}
                            socialWorkerInfoJSON={this.state.socialWorkerInfoJSON}
                        />
                        <PrivateRoute
                            exact
                            path={"/homelessRegistration"}
                            component={HomelessRegistration}
                            handleLogout={this.handleLogout}
                            loggedInStatus={this.state.loggedInStatus}
                            handlUser={this.handlUser}
                            username={this.state.username}
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
                            clearanceLevel={this.state.clearanceLevel}
                            username={this.state.username}
                            loggedInStatus={this.state.loggedInStatus}
                            clearanceLevel={this.state.clearanceLevel}
                            serviceProvider={this.state.serviceProvider}
                            inputPersonalId={this.inputPersonalId}
                            handleLogout={this.handleLogout}
                        />
                        <PrivateRoute
                            exact
                            path={"/serviceProvider"}
                            component={WrappedServiceProvider}
                            clearanceLevel={this.state.clearanceLevel}
                            username={this.state.username}
                            loggedInStatus={this.state.loggedInStatus}
                            clearanceLevel={this.state.clearanceLevel}
                            serviceProvider={this.state.serviceProvider}
                            handleLogout={this.handleLogout}
                            pageComponent={this.state.pageComponent}
                            handleHomelessPersonInventoryJson={this.handleHomelessPersonInventoryJson}
                        />
                        <PrivateRoute
                            exact
                            path={"/transactionPage"}
                            component={Transaction}
                            homelessPersonId={this.state.homelessPersonId}
                            loggedInStatus={this.state.loggedInStatus}
                            serviceProvider={this.state.serviceProvider}
                            handleLogout={this.handleLogout}
                        />
                        <PrivateRoute
                            exact
                            path={"/social"}
                            component={SocialWorker}
                            clearanceLevel={this.state.clearanceLevel}
                            username={this.state.username}
                            loggedInStatus={this.state.loggedInStatus}
                            serviceProvider={this.state.serviceProvider}
                            method={this.method}
                        />
                        <PrivateRoute
                            exact
                            path={"/createAppointment"}
                            component={SetAppointments}
                            loggedInStatus={this.state.loggedInStatus}
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
                            path={"/viewAllEnrollment"}
                            component={viewAllEnrollment}
                            loggedInStatus={this.state.loggedInStatus}
                            homelessPersonId={this.state.homelessPersonId}
                            inputEnrollmentId={this.inputEnrollmentId}
                            handleLogout={this.handleLogout}
                            updatePageComponent={this.updatePageComponent}
                        />
                        <PrivateRoute
                            exact
                            path={"/viewEnrollmentDetails"}
                            component={viewEnrollmentDetails}
                            loggedInStatus={this.state.loggedInStatus}
                            homelessPersonId={this.state.homelessPersonId}
                            enrollmentId={this.state.enrollmentId}
                            handleLogout={this.handleLogout}
                            updatePageComponent={this.updatePageComponent}
                        />
                        <PrivateRoute
                            exact
                            path={"/clientLanding"}
                            component={ClientLanding}
                            username={this.state.username}
                            loggedInStatus={this.state.loggedInStatus}
                            clearanceLevel={this.state.clearanceLevel}
                            serviceProvider={this.state.serviceProvider}
                            handleLogout={this.handleLogout}
                            handleHomelessPersonJson={this.handleHomelessPersonJson}
                            handleAppointmentJson={this.handleAppointmentJson}
                        />
                        <PrivateRoute
                            exact
                            path={"/clientInfo"}
                            component={ClientPersonalInfo}
                            username={this.state.username}
                            loggedInStatus={this.state.loggedInStatus}
                            clearanceLevel={this.state.clearanceLevel}
                            serviceProvider={this.state.serviceProvider}
                            homelessPersonId={this.state.handleHomelessPersonId}
                            handleLogout={this.handleLogout}
                            homelessData={this.state.homelessData}
                            appointmentData={this.state.xyz}
                        />
                        <PrivateRoute
                            exact
                            path={"/success"}
                            component={SuccessfulRegistration}
                            loggedInStatus={this.state.loggedInStatus}
                            homelessPersonId={this.state.homelessPersonId}
                            handleLogout={this.handleLogout}
                            updatePageComponent={this.updatePageComponent}
                        />
                        <PrivateRoute
                            exact
                            path={"/successful"}
                            component={SuccessfulSocialRegistration}
                            loggedInStatus={this.state.loggedInStatus}
                            homelessPersonId={this.state.homelessPersonId}
                            handleLogout={this.handleLogout}
                            updatePageComponent={this.updatePageComponent}
                        />

                        <PrivateRoute
                            exact
                            path={"/successUpdate"}
                            component={SuccessfulUpdate}
                            loggedInStatus={this.state.loggedInStatus}
                            homelessPersonId={this.state.homelessPersonId}
                            handleLogout={this.handleLogout}
                            updatePageComponent={this.updatePageComponent}
                        />
                        <PrivateRoute
                            exact
                            path={"/transactionComplete"}
                            component={TransactionComplete}
                            loggedInStatus={this.state.loggedInStatus}
                            homelessPersonId={this.state.homelessPersonId}
                            handleLogout={this.handleLogout}
                            updatePageComponent={this.updatePageComponent}
                        />
                        <PrivateRoute
                            exact
                            path={"/productAdditionComplete"}
                            component={AddProductSuccess}
                            loggedInStatus={this.state.loggedInStatus}
                            homelessPersonId={this.state.homelessPersonId}
                            handleLogout={this.handleLogout}
                            updatePageComponent={this.updatePageComponent}
                        />
                        <Route
                            exact
                            path={"/loginError"}
                            component={LoginError}
                            loggedInStatus={this.state.loggedInStatus}
                            handleLogout={this.handleLogout}
                        />
                        <Route
                            exact
                            path={"/forgotPassword"}
                            component={ForgotPasswordForm}
                            loggedInStatus={this.state.loggedInStatus}
                            handleLogout={this.handleLogout}
                        />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}
import React from "react";
import Header from "./Header"
import LocationMap from "./LocationMap"
import StreetCardFooter from './StreetCardFooter'

export default class LandingPage extends React.Component {
  
  constructor(props) {
    super(props);
     this.state = {
      loggedInStatus: this.props.loggedInStatus
    };
    this.handleSuccessfulLoginAction = this.handleSuccessfulLoginAction.bind(this);

  }


  handleSuccessfulLoginAction() {
    this.props.history.push('/login');
  }

  handleLogoutClick() {
    this.props.handleLogout();
  }

  render() {
    return (
      <div>
      <Header 
      handleSuccessfulLoginAction={this.handleSuccessfulLoginAction}
      loggedInStatus={this.state.loggedInStatus}
       />,
      <div><LocationMap className ="location-map"/></div>
      <StreetCardFooter/>
      </div>
    );
  }
} 
import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { PageHeader, Button} from "antd";
import { Link } from 'react-router-dom'; 

export default class Header extends React.Component {

	constructor(props) {
	   super(props);
	   this.logIn = this.logIn.bind(this);
	   this.logOut = this.logOut.bind(this);
	}

	logIn() {
		this.props.handleSuccessfulLoginAction();
	}


	logOut() {
		this.props.handleSuccessfulLogoutAction();
	}
	render(){
		if(this.props.loginPageStatus === "LOGIN_HEADER"){
			return(
			<div
			    style={{
			      backgroundColor: "#8C1D40",
			      padding: 24
			    }}
			  >
			    <PageHeader
			      ghost={false}
			      title="StreetCard"
			    />
			  </div>
		);	
		}else if(this.props.loggedInStatus === "NOT_LOGGED_IN"){
			return(
			<div
			    style={{
			      backgroundColor: "#8C1D40",
			      padding: 24
			    }}
			  >
			    <PageHeader
			      ghost={false}
			      title="StreetCard"
			      extra={[
			        <Button onClick={this.logIn} style={{ fontSize:22 }} key="2">Login</Button>
			      ]}
			    />
			  </div>
		);	
		}else {
			return(
			<div
			    style={{
			      backgroundColor: "#8C1D40",
			      padding: 24
			    }}
			  >
			    <PageHeader
			      ghost={false}
			      title="StreetCard"
			      extra={[
			        <Button onClick={this.logOut} style={{ fontSize:22 }} key="2">Logout</Button>
			      ]}
			    />
			  </div>
		);	
		}
	}
}
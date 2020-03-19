import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { PageHeader, Button} from "antd";
import { Link } from 'react-router-dom'; 
import logo from './streetcard-logo.png';
import headerName from './streetcard.png';
import { Layout, Menu, Avatar, Dropdown } from "antd";

const { Header } = Layout;

export default class HeaderComponent extends React.Component {

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
			<Header className="site-layout-header">
	          <img className="logo" src={logo} />
	        </Header>
		);	
		}else if(this.props.loggedInStatus === "NOT_LOGGED_IN"){
			return(
			<Header className="site-layout-header">
	          <img className="logo" src={logo} />
	          <Button onClick={this.logIn} style={{ fontSize:22, float: 'right', marginTop: '10px', width: '200px', height: '50px', backgroundColor: '#fae596' }} key="2">Home</Button>
	        </Header>
		);	
		}else {
			return(
			<Header className="site-layout-header">
	          <img className="logo" src={logo} />
	          <Button onClick={this.logOut} style={{ fontSize:22, float: 'right', marginTop: '10px', width: '200px', height: '50px', backgroundColor: '#fae596' }} key="2">Logout</Button>
	        </Header>
		);	
		}
	}
}
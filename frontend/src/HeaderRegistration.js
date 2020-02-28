import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { PageHeader, Button} from "antd";
import { Redirect } from 'react-router-dom'

export default class Header extends React.Component {

	constructor(props) {
	    super(props);
	 }

	logOut() {
	  localStorage.removeItem('access_token');
	  localStorage.removeItem('refresh_token');
	 	
	}

	
	render(){

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
			        <Button onClick={this.logOut} style={{ fontSize:22 }} key="2">Logout</Button>,
			      ]}
			    />
			</div>
		);
	}
}

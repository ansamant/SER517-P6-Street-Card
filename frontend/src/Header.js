import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { PageHeader, Button} from "antd";
import { Link } from 'react-router-dom'; 

export default class Header extends React.Component {

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
			        <Link to="/login"><Button style={{ fontSize:22 }} key="2">Login</Button></Link>
			      ]}
			    />
			  </div>
		);
	}
}
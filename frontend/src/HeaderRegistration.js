import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { PageHeader, Button} from "antd";

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
			        <Button style={{ fontSize:22 }} key="2">Logout</Button>,
			      ]}
			    />
			  </div>
		);
	}
}

import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

export default class StreetCardFooter extends React.Component {

	render(){
		return(
			<Footer style={{ textAlign: 'center', position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#d3d3d3' }}>StreetCard Design 2020 Created by ASU</Footer>
		);
	}
}
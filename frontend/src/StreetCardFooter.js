import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

export default class StreetCardFooter extends React.Component {

	render(){
		return(
			<Footer style={{ textAlign: 'center', position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#dddfd4', height: '11vh', fontSize: '22px' }}><div style={{ marginTop: '20px'}}>StreetCard Design 2020 Created by ASU</div></Footer>
		);
	}
}
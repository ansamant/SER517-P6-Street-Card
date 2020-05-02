import React from "react";
import {Layout} from "antd";

const {Footer} = Layout;

export default class StreetCardFooter extends React.Component {

    render() {
        const link = "https://www.asu.edu"
        return (
            <Footer className="footer-style">
                <div style={{marginTop: "2px"}}>StreetCard Design 2020 Created by <a href={link}> ASU </a></div>
            </Footer>
        );
    }
}
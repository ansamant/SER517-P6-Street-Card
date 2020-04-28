import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import {PageHeader} from "antd";

export default class Header extends React.Component {

    render() {
        return (
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
    }
}

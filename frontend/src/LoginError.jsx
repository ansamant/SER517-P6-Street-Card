import React, {Component} from "react";
import "antd/dist/antd.css";
import {Button, Layout, Result} from 'antd';
import Header from "./Header";
import StreetCardFooter from "./StreetCardFooter";

const {Content} = Layout;

class LoginError extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginPageStatus: "LOGIN_HEADER"
        };
        this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);
        this.handleButton = this.handleButton.bind(this);
    }

    handleSuccessfulLogoutAction() {
        this.props.handleLogout();
        this.props.history.push('/login');
    }

    handleButton() {
        this.props.history.push('/login');
    }

    render() {
        return (
            <Layout>
                <Header loginPageStatus={this.state.loginPageStatus}/>
                <Content className="content-login">
                    <div className="site-layout-content-login">
                        <Result
                            status="error"
                            title="Login Error"
                            subTitle="Wrong Username/Password Combination"
                            extra={[
                                <Button type="primary" key="console" onClick={this.handleButton}>
                                    Login Again
                                </Button>,
                            ]}
                        />
                    </div>
                </Content>
                <StreetCardFooter/>
            </Layout>
        )
    }
}

export default LoginError;

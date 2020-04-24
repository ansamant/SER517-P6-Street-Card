import React, {Component} from "react";
import "antd/dist/antd.css";
import {Button, Form, Layout, Result} from 'antd';
import Header from "./Header";
import StreetCardFooter from "./StreetCardFooter";

const {Content} = Layout;

class TransactionComplete extends Component {
    constructor(props) {
        super(props);
        this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);
        this.handleButton = this.handleButton.bind(this);
    }

    handleSuccessfulLogoutAction() {
        this.props.handleLogout();
        this.props.history.push('/login');
    }

    handleButton(){
        this.props.history.push('/greeter');
    }

    render() {
        return (
            <Layout>
                <Header
                    handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                    loggedInStatus={this.props.loggedInStatus}/>
                    <Content className="content-login">
                        <div className="site-layout-content-login">
                            <Result
                                status="success"
                                title="Inventory Updated"
                                subTitle=""
                                extra={[
                                    <Button type="primary" key="console" onClick={this.handleButton}>
                                        Go Back
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
export default TransactionComplete;

import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {Button, Form, Layout, Result} from 'antd';
import Header from './Header'
import StreetCardFooter from './StreetCardFooter'

const {Content} = Layout;

class ForgotPassword extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            loginPageStatus: "LOGIN_HEADER"
        };
        this.handleAlternate = this.handleAlternate.bind(this);
    }


    handleAlternate() {

        this.props.history.push('/login');
    };

    render() {
        return (
            <Layout>
                <Header loginPageStatus={this.state.loginPageStatus}/>
                <Content className="content-login">
                    <div className="site-layout-content-login">
                        <Result
                            status="warning"
                            title="Forgot Password"
                            subTitle="Please Contact the Admin for resetting password"
                            extra={[
                                <Button type="primary" key="console" onClick={this.handleAlternate}>
                                    Back to Login
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

const ForgotPasswordForm = Form.create({name: "forgotPassword"})(
    ForgotPassword
);

export default ForgotPasswordForm;
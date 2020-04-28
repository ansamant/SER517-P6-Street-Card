import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {Button, Form, Icon, Input, Layout} from 'antd';
import Header from './Header'
import StreetCardFooter from './StreetCardFooter'

const {Content} = Layout;
const displayerror = [];

class NormalLoginForm extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            loginPageStatus: "LOGIN_HEADER"
        };
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }


    handleLoginSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                fetch(process.env.REACT_APP_IP + 'api/token/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                })
                    .then(res => {
                        if (res.status === 200) {
                            return res.json();
                        } else {
                            return null;
                        }
                    })
                    .then((resp) => {
                        if (resp === null) {
                            this.props.history.push('/loginError');
                        } else {
                            this.props.handleLogin(resp, values.username);
                            this.props.history.push('/social');
                        }
                    });
            }
        });
    };


    handleAlternate = e => {

        this.props.history.push('/forgotPassword');
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        let form;
        form = <Layout className="layout">
            <Header loginPageStatus={this.state.loginPageStatus}/>
            <Content className="content-login">
                <div className="site-layout-content-login">
                    <Form onSubmit={this.handleLoginSubmit}>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: 'Please input your username!'}],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Please input your Password!'}],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={this.handleAlternate.bind(this)} type="primary"
                                    className="login-form-button">
                                Forgot Password
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
            <StreetCardFooter/>
        </Layout>;
        return (
            <div>{form} </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(NormalLoginForm);

export default WrappedNormalLoginForm
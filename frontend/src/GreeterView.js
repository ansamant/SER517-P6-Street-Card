import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {Button, Col, Form, Icon, Input, Layout, Row} from "antd";
import Header from './Header'
import StreetCardFooter from './StreetCardFooter'

const {Content} = Layout;

class GreeterView extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.clearanceLevel);
        console.log(this.props.serviceProvider);
        this.state = {
            isLoaded: false,
            name: "",
            id: "",
            clearanceLevel: this.props.clearanceLevel,
            serviceProvider: this.props.serviceProvider
        }
        this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);
    }


    componentDidMount() {

    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {

            if (!err) {

                var registerRequestObject = {};
                registerRequestObject.serviceProvider = this.state.serviceProvider;
                registerRequestObject.clientName = "";
                console.log(registerRequestObject);
                fetch('http://localhost:8000/homeless/' + values.personalId + '/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }

                })
                    .then(res => res.json())
                    .then(json => {
                        // Need name to be used in the header for easy mapping of client name.
                        registerRequestObject.clientName = json['FirstName'] + ' ' + json['LastName']
                        //console.log("REG1 " + registerRequestObject.clientName)
                        this.setState({
                            isLoaded: true,
                            name: registerRequestObject.clientName,
                            id: values.personalId
                        })

                    }).then(json => {
                    //should only run after get request has successfully
                    //console.log("REG2 "+ JSON.stringify(registerRequestObject));
                    fetch('http://localhost:8000/homeless/' + values.personalId + '/logs/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify(registerRequestObject)
                    })
                        .then(res => res.json())
                        .then(
                            json => {
                                console.log("register response:", json);
                            });
                });
            }
        });
    };


    handleSuccessfulLogoutAction() {
        this.props.handleLogout();
        this.props.history.push('/login');
    }

    processTransaction(personalId) {
        console.log(personalId)
        this.props.inputPersonalId(personalId)
        this.props.history.push('/transactionPage');
    }

    render() {
        // const {items} = this.state;
        const {name} = this.state;
        const {isLoaded} = this.state;
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16}
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 16,
                    offset: 8
                }
            }
        };
        if (this.state.isLoaded == true) {
            let form;
            form = <Layout className="layout">
                <Header handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                        loggedInStatus={this.state.loggedInStatus}
                />
                <Layout>
                    <Content className="content-login">
                        <div className="site-layout-content-login">
                            <Row>
                                <Col span={24}>
                                    <h3>Hello {this.state.name}</h3>
                                </Col>
                                </Row>
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <Form.Item>
                                    {getFieldDecorator('personalId', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input Identification Number!',
                                                whitespace: true
                                            }
                                        ],
                                    })(
                                        <Input
                                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                            placeholder="Client Identification Number"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Submit
                                    </Button>
                                </Form.Item>

                                <Row>

                                <Col span={24}>
                                    <Button type="link" htmlType="submit"
                                            onClick={() => this.processTransaction(this.state.id)}>
                                        Go to Inventory ->
                                    </Button>
                                </Col>
                            </Row>
                            </Form>
                        </div>
                    </Content>
                </Layout>
                <StreetCardFooter/>
            </Layout>;
            return (
                <div>

                    {form}
                </div>
            );
        } else {
            let form;
            form = <Layout className="layout">
                <Header handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                        loggedInStatus={this.state.loggedInStatus}
                />
                <Layout>
                    <Content className="content-login">
                        <div className="site-layout-content-login">
                            <Form onSubmit={this.handleSubmit} className="login-form">

                                <Form.Item>
                                    {getFieldDecorator('personalId', {
                                        rules: [{required: true, message: 'Please input Identification Number!'}],
                                    })(
                                        <Input
                                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                            placeholder="Client Identification Number"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Content>
                </Layout>
                <StreetCardFooter/>
            </Layout>;
            return (
                <div>{form}</div>
            );
        }
    }
}

const WrappedGreeterForm = Form.create({name: "greeter"})(
    GreeterView
);

export default WrappedGreeterForm;
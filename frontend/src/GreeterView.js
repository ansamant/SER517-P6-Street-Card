import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {Button, Col, Form, Icon, Input, Layout, Row, Spin} from "antd";
import Header from './Header'
import StreetCardFooter from './StreetCardFooter'

const {Content} = Layout;

class GreeterView extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            isLoaded: false,
            name: "",
            id: "",
            clicked: false,
            clearanceLevel: this.props.clearanceLevel,
            serviceProvider: this.props.serviceProvider
        }
        this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);
    }


    componentDidMount() {

    }

    waitComponent(values, registerRequestObject) {
        //should only run after get request has successfully
        fetch(process.env.REACT_APP_IP + 'homeless/' + values.personalId + '/logs/', {
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

                });
    }

    handleSubmit = e => {
        this.state.clicked = true
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {

            if (!err) {
                var registerRequestObject = {};
                registerRequestObject.serviceProvider = this.state.serviceProvider;
                registerRequestObject.clientName = "";
                fetch(process.env.REACT_APP_IP + 'homeless/' + values.personalId + '/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }

                })
                    .then(res => {
                        if (res.status == 200) {
                            res.json().then(json => {
                                registerRequestObject.clientName = json['FirstName'] + ' ' + json['LastName']
                                this.setState({
                                    isLoaded: true,
                                    name: registerRequestObject.clientName,
                                    id: values.personalId
                                })
                                setTimeout(this.waitComponent(values, registerRequestObject), 1000);
                            })
                        } else if (Math.round(res.status / 100) == 4) {
                            if (window.confirm("Error, invalid personal id: " + (res.status).toString())) {
                                this.state.clicked = false;
                                this.state.isLoaded = false;
                                this.props.history.push('/greeter');
                            } else {
                                this.state.clicked = false;
                                this.state.isLoaded = false;
                                this.props.history.push('/greeter');
                            }
                        } else if (Math.round(res.status / 100) == 5) {
                            if (window.confirm("Server Error: " + (res.status).toString())) {
                                this.state.clicked = false;
                                this.state.isLoaded = false;
                                this.props.history.push('/greeter');
                            } else {
                                this.state.clicked = false;
                                this.state.isLoaded = false;
                                this.props.history.push('/greeter');
                            }
                        }

                    })
            }
        });
    };


    handleSuccessfulLogoutAction() {
        this.props.handleLogout();
        this.props.history.push('/login');
    }

    processTransaction(personalId) {
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
                                    <h6>Hello {this.state.name}</h6>
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
        } else if (this.state.isLoaded == false && this.state.clicked == true) {
            let form;
            form = <Layout className="layout">
                <Header handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                        loggedInStatus={this.state.loggedInStatus}
                />
                <Layout>
                    <Content className="content-login">
                        <div className="site-layout-content-login">
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <Row>
                                    <Col span={24}>
                                        <span>Loading . . . <Spin/></span>
                                    </Col>
                                </Row>
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
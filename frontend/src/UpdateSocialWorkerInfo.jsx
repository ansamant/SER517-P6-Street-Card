import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import {AutoComplete, Button, Col, Form, Icon, Input, Layout, Result, Row} from "antd";
import Header from "./Header";
import StreetCardFooter from './StreetCardFooter'
import SiderComponentSocialWorker from "./SiderComponentSocialWorker";

const AutoCompleteOption = AutoComplete.Option;

const {Content, Sider} = Layout;

const clearanceLevel = [
    {
        value: "greeter",
        label: "Greeter"
    },
    {
        value: "caseworker",
        label: "Case Worker"
    },
    {
        value: "service_provider",
        label: "Service Provider Employee"
    },
    {
        value: "client",
        label: "Client"
    },
    {
        value: "admin",
        label: "Admin"
    }
];


const serviceProvider = [
    {
        value: "FP",
        label: "Food Pantry"
    },
    {
        value: "DIC",
        label: "Drop in Centre"
    },
    {
        value: "SH",
        label: "Shelter Home"
    },
    {
        value: "SK",
        label: "Soup Kitchen"
    },
    {
        value: "NA",
        label: "Not Available"
    },
    {
        value: "OTH",
        label: "Others"
    }
];

const TITLE = 'Register Social worker'

class UpdateSocialWorkerInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
        }
        this.setState({username: this.props.username ? this.props.username : ''})
        this.handleSocialWorkerRegistrationSubmit = this.handleSocialWorkerRegistrationSubmit.bind(this);
        this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);
        this.setPagecomponent = this.setPagecomponent.bind(this);
        this.handleButton = this.handleButton.bind(this);
    }

    componentDidMount() {

    }

    handleSuccessfulLogoutAction() {
        this.props.handleLogout();
        this.props.history.push('/login');
    }


    handleSocialWorkerRegistrationSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {

            if (!err) {
                var registerRequestObject = {};
                registerRequestObject.username = this.props.socialWorkerInfoJSON.user_name;
                registerRequestObject.password = values.password;
                fetch(process.env.REACT_APP_IP + 'register/' + this.props.socialWorkerInfoJSON.user_id + '/', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(registerRequestObject)
                })
                    .then(res => {
                        if (res.status === 200) {
                            this.setState({
                                isLoaded: true,
                            })
                        }
                    });

            }
        });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value !== form.getFieldValue("password")) {
            callback("Two passwords that you enter is inconsistent!");
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(["confirm"], {force: true});
        }
        callback();
    };


    setPagecomponent(pageComponentValue) {
        this.props.updatePageComponent(pageComponentValue)
        this.props.history.push('/socialWorkerRegister');
    };


    handleButton() {
        this.props.history.push('/socialWorkerRegister');
    }

    render() {
        if (this.state.isLoaded == true) {
            return (
                <Layout>
                    <Header
                        handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                        loggedInStatus={this.props.loggedInStatus}/>
                    <Layout>
                        <SiderComponentSocialWorker
                            setPagecomponent={this.setPagecomponent}
                        />
                        <Content className="content-login">
                            <div className="site-layout-content-login">
                                <Result
                                    status="success"
                                    title="Update Successful"
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
                </Layout>
            )
        } else {
            const {getFieldDecorator} = this.props.form;
            if (this.props.socialWorkerInfoJSON == null) {
                return (
                    <Layout className="layout">
                        <Header loginPageStatus={this.state.loginPageStatus}/>
                        <Layout>
                            <Content className="content-login">
                                <div className="site-layout-content-login">
                                    <Result
                                        status="warning"
                                        title="Please Login Again"
                                        extra={[
                                            <Button type="primary" key="console" onClick={this.handleButton}>
                                                Login Again
                                            </Button>,
                                        ]}
                                    />
                                </div>
                            </Content>
                        </Layout>
                        <StreetCardFooter/>
                    </Layout>
                );
            } else {
                return (
                    <Layout className="layout">
                        <Header
                            handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                            loggedInStatus={this.state.loggedInStatus}
                        />
                        <Layout>
                            <SiderComponentSocialWorker
                                setPagecomponent={this.setPagecomponent}
                            />
                            <Content className="content-login">
                                <div className="site-layout-content-login">
                                    <Form onSubmit={this.handleSocialWorkerRegistrationSubmit}>
                                        <Row gutter={36}>
                                            <Col span={12}>
                                                <Form.Item>
                                                    <Input defaultValue={this.props.socialWorkerInfoJSON.user_name}
                                                           disabled={true}/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item>
                                                    <Input defaultValue={this.props.socialWorkerInfoJSON.user.email}
                                                           disabled={true}/>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={36}>
                                            <Col span={12}>
                                                <Form.Item hasFeedback>
                                                    {getFieldDecorator("password", {
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: "Please input your password!"
                                                            },
                                                            {
                                                                validator: this.validateToNextPassword
                                                            }
                                                        ]
                                                    })(<Input.Password
                                                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                        placeholder="Password"/>)}
                                                </Form.Item>

                                            </Col>
                                            <Col span={12}>
                                                <Form.Item hasFeedback className="register-ant-form-item">
                                                    {getFieldDecorator("confirm", {
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: "Please confirm your password!"
                                                            },
                                                            {
                                                                validator: this.compareToFirstPassword
                                                            }
                                                        ]
                                                    })(<Input.Password
                                                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                        placeholder="Confirm Password"
                                                        onBlur={this.handleConfirmBlur}/>)}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={36}>
                                            <Col span={12}>
                                                <Form.Item>
                                                    <Input
                                                        defaultValue={this.props.socialWorkerInfoJSON.user.first_name}
                                                        disabled={true}/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item>
                                                    <Input defaultValue={this.props.socialWorkerInfoJSON.user.last_name}
                                                           disabled={true}/>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={36}>
                                            <Col span={12}>
                                                <Form.Item>
                                                    <Button type="primary" htmlType="submit"
                                                            className="registration-submit-button">
                                                        Submit
                                                    </Button>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </Content>
                        </Layout>
                        <StreetCardFooter/>
                    </Layout>
                );
            }

        }
    }
}

const UpdateSocialWorkerInfoForm = Form.create({name: "register"})(
    UpdateSocialWorkerInfo
);

export default UpdateSocialWorkerInfoForm;

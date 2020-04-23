import React from "react";
import "antd/dist/antd.css";
import "../index.css";
import {
    Alert,
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Collapse,
    DatePicker,
    Form,
    Icon,
    Input,
    Layout,
    Row,
    Select,
    Result
} from "antd";
import Header from "../Header";
import StreetCardFooter from '../StreetCardFooter'
import SiderComponentSocialWorker from "../component/SiderComponentSocialWorker";

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
        value: "service_provider_emp",
        label: "Service Provider Employee"
    },
    {
        value: "client",
        label: "Client"
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
    }
];

const TITLE = 'Register Social worker'

class UpdateSocialWorkerInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
        }
        console.log(this.props.socialWorkerInfoJSON)
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
                registerRequestObject.username = values.username;
                registerRequestObject.email = values.email;
                registerRequestObject.first_name = values.first_name;
                registerRequestObject.last_name = values.last_name;
                registerRequestObject.password = values.password;

                var socialWorker = {};
                socialWorker.clearanceLevel = values.clearanceLevel[0];
                socialWorker.address = values.address;
                socialWorker.serviceProvider = values.serviceProvider[0];

                registerRequestObject.socialWorker = socialWorker;

                console.log(registerRequestObject);

                fetch('http://localhost:8000/register/' + this.props.socialWorkerInfoJSON.user_id + '/' , {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(registerRequestObject)
                })
                    .then(res => {
                        if (res.status == 200) {
                            console.log(res);
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
        this.setState({
            pageComponent: pageComponentValue
        });
    };

    handleButton(){
        this.props.history.push('/socialWorkerRegister');
    }

    render() {
        
        const {autoCompleteResult} = this.state;
        console.log(this.state.pageComponent);
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
        }else {
            const {getFieldDecorator} = this.props.form;
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
                                            {getFieldDecorator("username", {
                                                initialValue: this.props.socialWorkerInfoJSON.user_name,
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "Please input your username!",
                                                        whitespace: true
                                                    }
                                                ]
                                            })(<Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                        placeholder="Username"/>)}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item>
                                            {getFieldDecorator("email", {
                                                initialValue: this.props.socialWorkerInfoJSON.user.email,
                                                rules: [
                                                    {
                                                        type: "email",
                                                        message: "The input is not valid E-mail!"
                                                    },
                                                    {
                                                        required: true,
                                                        message: "Please input your E-mail!"
                                                    }
                                                ]
                                            })(<Input prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                        placeholder="E-mail"/>)}
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
                                                placeholder="Confirm Password" onBlur={this.handleConfirmBlur}/>)}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={36}>
                                    <Col span={12}>
                                        <Form.Item>
                                            {getFieldDecorator("first_name", {
                                                initialValue: this.props.socialWorkerInfoJSON.user.first_name,
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "Please input your first name!",
                                                        whitespace: true
                                                    }
                                                ]
                                            })(<Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                        placeholder="First Name"/>)}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item>
                                            {getFieldDecorator("last_name", {
                                                initialValue: this.props.socialWorkerInfoJSON.user.last_name,
                                                rules: [
                                                    {
                                                        message: "Please input your last name!",
                                                        whitespace: true
                                                    }
                                                ]
                                            })(<Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                        placeholder="Last Name"/>)}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={36}>
                                    <Col span={12}>
                                        <Form.Item>
                                            {getFieldDecorator("serviceProvider", {
                                                rules: [
                                                    {
                                                        type: "array",
                                                        required: true,
                                                        message: "Please select your role!"
                                                    }
                                                ]
                                            })(<Cascader options={serviceProvider} placeholder="Service Provider"/>)}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item>
                                            {getFieldDecorator("clearanceLevel", {
                                                rules: [
                                                    {
                                                        type: "array",
                                                        required: true,
                                                        message: "Please select your role!"
                                                    }
                                                ]
                                            })(<Cascader options={clearanceLevel} placeholder="Clearence Level"/>)}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item>
                                            {getFieldDecorator("address", {
                                                initialValue: this.props.socialWorkerInfoJSON.user.socialWorker.address,
                                                rules: [
                                                    {
                                                        message: "Please input your address!",
                                                        whitespace: true
                                                    }
                                                ]
                                            })(<Input prefix={<Icon type="home" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                        placeholder="Address"/>)}
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

const UpdateSocialWorkerInfoForm = Form.create({name: "register"})(
    UpdateSocialWorkerInfo
);

export default UpdateSocialWorkerInfoForm;

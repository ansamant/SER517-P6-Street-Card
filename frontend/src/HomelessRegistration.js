import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import {
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
    Spin
} from "antd";
import Header from "./Header";
import StreetCardFooter from './StreetCardFooter'
import moment from 'moment';
import SiderComponent from './SiderComponent'

const {Option} = Select;
const {Content} = Layout;
const {Panel} = Collapse;

const nameDataQuality = [
    {
        value: 1,
        label: "Full Name Reported"
    },
    {
        value: 2,
        label: "Partial Name Reported"
    },
    {
        value: 8,
        label: "Client Doesn\'t Know"
    },
    {
        value: 9,
        label: "Client Refused"
    },
    {
        value: 99,
        label: "Data Not Collected"
    }
];

const SSNDataQuality = [
    {
        value: 1,
        label: "Full SSN Reported"
    },
    {
        value: 2,
        label: "Partial SSN Reported"
    },
    {
        value: 8,
        label: "Client Doesn\'t Know"
    },
    {
        value: 9,
        label: "Client Refused"
    },
    {
        value: 99,
        label: "Data Not Collected"
    }
];

const DOBDataQuality = [
    {
        value: 1,
        label: "Full DOB Reported"
    },
    {
        value: 2,
        label: "Partial DOB Reported"
    },
    {
        value: 8,
        label: "Client Doesn\'t Know"
    },
    {
        value: 9,
        label: "Client Refused"
    },
    {
        value: 99,
        label: "Data Not Collected"
    }
];

const Race = [
    {
        value: 1,
        label: "American India or Alaskan Native"
    },
    {
        value: 2,
        label: "Asian"
    },
    {
        value: 3,
        label: "Black or African American"
    },
    {
        value: 4,
        label: "Native Hawaiian or Pacific Islander"
    },
    {
        value: 5,
        label: "White"
    },
    {
        value: 8,
        label: "Client Doesn\'t Know"
    },
    {
        value: 9,
        label: "Client Refused"
    },
    {
        value: 99,
        label: "Data Not Collected"
    }
];

const Ethnicity = [
    {
        value: 0,
        label: "Non Hispanic/Non Latino"
    },
    {
        value: 1,
        label: "Hispanic/Latino"
    },
    {
        value: 8,
        label: "Client Doesn\'t Know"
    },
    {
        value: 9,
        label: "Client Refused"
    },
    {
        value: 99,
        label: "Data Not Collected"
    }
];

const Gender = [
    {
        value: 0,
        label: "Female"
    },
    {
        value: 1,
        label: "Male"
    },
    {
        value: 3,
        label: "Trans Femal"
    },
    {
        value: 4,
        label: "Trans Male"
    },
    {
        value: 5,
        label: "Gender Non-Conforming"
    },
    {
        value: 8,
        label: "Client Doesn\'t Know"
    },
    {
        value: 9,
        label: "Client Refused"
    },
    {
        value: 99,
        label: "Data Not Collected"
    }
];

const VeteranStatus = [
    {
        value: 0,
        label: "No"
    },
    {
        value: 1,
        label: "Yes"
    },
    {
        value: 8,
        label: "Client Doesn\'t Know"
    },
    {
        value: 9,
        label: "Client Refused"
    },
    {
        value: 99,
        label: "Data Not Collected"
    }
];


class homelessRegistration extends React.Component {

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        homelessData: null,
        isLoaded: false
    };

    constructor(props) {
        super(props);
        this.handleHomelessPersonRegistrationSubmit = this.handleHomelessPersonRegistrationSubmit.bind(this);
        this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);
        this.handleHomelessPersonUpdateRegistrationSubmit = this.handleHomelessPersonUpdateRegistrationSubmit.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
        this.setPagecomponent = this.setPagecomponent.bind(this);
    }

    waitComponent() {
        fetch(process.env.REACT_APP_IP + 'homeless/' + this.props.homelessPersonId + '/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                if (res.status == 200) {
                    res.json().then(json => {
                        this.setState({
                            homelessData: json,
                            isLoaded: true
                        })
                    })
                } else if (Math.round(res.status / 100) == 4) {
                    if (window.confirm("Error, invalid personal id: " + (res.status).toString())) {
                        this.props.history.push('/socialWorkerRegister');
                    } else {
                        this.props.history.push('/socialWorkerRegister');
                    }
                } else if (Math.round(res.status / 100) == 5) {
                    if (window.confirm("Server Error: " + (res.status).toString())) {
                        this.props.history.push('/socialWorkerRegister');
                    } else {
                        this.props.history.push('/socialWorkerRegister');
                    }
                }
            })
    }

    componentDidMount() {
        setTimeout(this.waitComponent(), 6000);
    }

    handleSuccessfulLogoutAction() {
        this.props.handleLogout();
        this.props.history.push('/login');
    }


    handleHomelessPersonRegistrationSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {

            if (!err) {
                var registerRequestObject = {};
                registerRequestObject.FirstName = values.FirstName ? values.FirstName : null;
                registerRequestObject.MiddleName = values.MiddleName ? values.MiddleName : null;
                registerRequestObject.LastName = values.LastName ? values.LastName : null;
                registerRequestObject.NameSuffix = values.NameSuffix ? values.NameSuffix : null;
                registerRequestObject.NameDataQuality = values.NameDataQuality[0];
                registerRequestObject.SSN = values.SSN ? values.SSN : null;
                registerRequestObject.SSNDataQuality = values.SSNDataQuality[0];
                registerRequestObject.DOB = values['DOB'] ? values['DOB'].format('YYYY-MM-DD') : null;
                registerRequestObject.DOBDataQuality = values.DOBDataQuality[0];
                registerRequestObject.Race = values.Race[0];
                registerRequestObject.Ethnicity = values.Ethnicity[0];
                registerRequestObject.Gender = values.Gender[0];
                registerRequestObject.VeteranStatus = values.VeteranStatus[0];

                fetch(process.env.REACT_APP_IP + 'homeless/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(registerRequestObject)
                })
                    .then(res => res.json())
                    .then(json => {
                        this.props.handleHomelessPersonId(registerRequestObject.PersonalId);
                        this.props.history.push('/socialWorkerRegister');
                    });
            }
        });
    }


    handleHomelessPersonUpdateRegistrationSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                var registerRequestObject = {};
                registerRequestObject.FirstName = values.FirstName ? values.FirstName : null;
                registerRequestObject.MiddleName = values.MiddleName ? values.MiddleName : null;
                registerRequestObject.LastName = values.LastName ? values.LastName : null;
                registerRequestObject.NameSuffix = values.NameSuffix ? values.NameSuffix : null;
                registerRequestObject.NameDataQuality = values.NameDataQuality[0];
                registerRequestObject.SSN = values.SSN ? values.SSN : null;
                registerRequestObject.SSNDataQuality = values.SSNDataQuality[0];
                registerRequestObject.DOB = values['DOB'] ? values['DOB'].format('YYYY-MM-DD') : null;
                registerRequestObject.DOBDataQuality = values.DOBDataQuality[0];
                registerRequestObject.Race = values.Race[0];
                registerRequestObject.Ethnicity = values.Ethnicity[0];
                registerRequestObject.Gender = values.Gender[0];
                registerRequestObject.VeteranStatus = values.VeteranStatus[0];
                registerRequestObject.PhoneNumberPrefix = values.PhoneNumberPrefix;
                registerRequestObject.PhoneNumber = values.PhoneNumber;
                registerRequestObject.Email = values.email;

                fetch(process.env.REACT_APP_IP + 'homeless/' + this.state.homelessData.PersonalId + '/', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(registerRequestObject)
                })
                    .then(res => res.json())
                    .then(json => {
                        this.props.handleHomelessPersonId(registerRequestObject.PersonalId);
                        this.props.history.push('/successUpdate');
                    });
            }
        });
    }

    handleConfirmBlur = e => {
        const {value} = e.target;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }


    setPagecomponent(pageComponentValue) {
        this.props.updatePageComponent(pageComponentValue)
        this.props.history.push('/socialWorkerRegister');
    };

    render() {
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

        if (this.state.isLoaded) {
            return (
                <Layout className="layout">
                    <Header
                        handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                        loggedInStatus={this.state.loggedInStatus}
                    />
                    <Layout>
                        <SiderComponent
                            setPagecomponent={this.setPagecomponent}
                        />
                        <Content className="content-enroll">
                            <div className="site-layout-content-homeless">
                                <Form {...formItemLayout} name="enrollment"
                                      onSubmit={this.handleHomelessPersonUpdateRegistrationSubmit}>
                                    <Collapse style={{backgroundColor: "#f0f9ff"}}>
                                        <Panel header="Name Information" key="1">
                                            <Row gutter={8}>
                                                <Col span={8} push={1}>
                                                    <Form.Item>
                                                        {getFieldDecorator("FirstName", {
                                                            initialValue: this.state.homelessData.FirstName ? this.state.homelessData.FirstName : '',
                                                            rules: [
                                                                {
                                                                    required: false,
                                                                    message: "Please input your First Name!",
                                                                    whitespace: true
                                                                }
                                                            ]
                                                        })(<Input
                                                            prefix={<Icon type="user"
                                                                          style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                            placeholder="First Name"/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8} push={1}>
                                                    <Form.Item>
                                                        {getFieldDecorator("MiddleName", {
                                                            initialValue: this.state.homelessData.MiddleName ? this.state.homelessData.MiddleName : '',
                                                            rules: [
                                                                {
                                                                    required: false,
                                                                    message: "Please input your Middle Name!",
                                                                    whitespace: true
                                                                }
                                                            ]
                                                        })(<Input
                                                            prefix={<Icon type="user"
                                                                          style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                            placeholder="Middle Name"/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8} push={1}>
                                                    <Form.Item>
                                                        {getFieldDecorator("LastName", {
                                                            initialValue: this.state.homelessData.LastName ? this.state.homelessData.LastName : '',
                                                            rules: [
                                                                {
                                                                    required: false,
                                                                    message: "Please input your Last Name!",
                                                                    whitespace: true
                                                                }
                                                            ]
                                                        })(<Input
                                                            prefix={<Icon type="user"
                                                                          style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                            placeholder="Last Name"/>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8} push={1}>
                                                    <Form.Item>
                                                        {getFieldDecorator("NameSuffix", {
                                                            initialValue: this.state.homelessData.NameSuffix ? this.state.homelessData.NameSuffix : '',
                                                            rules: [
                                                                {
                                                                    required: false,
                                                                    message: "Please input your Name Suffix!",
                                                                    whitespace: true
                                                                }
                                                            ]
                                                        })(<Input
                                                            prefix={<Icon type="user"
                                                                          style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                            placeholder="Name Suffix"/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8} push={1}>
                                                    <Form.Item>
                                                        {getFieldDecorator("NameDataQuality", {
                                                            rules: [
                                                                {
                                                                    type: "array",
                                                                    required: true,
                                                                    message: "Please select Quality level of Name Data!"
                                                                }
                                                            ]
                                                        })(<Cascader options={nameDataQuality}
                                                                     placeholder="Name Quality"/>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Panel>
                                        <Panel header="Social Security" key="2">
                                            <Row gutter={8}>
                                                <Col span={8} push={1}>
                                                    <Form.Item>
                                                        {getFieldDecorator("SSN", {
                                                            initialValue: this.state.homelessData.SSN ? this.state.homelessData.SSN : '',
                                                            rules: [
                                                                {
                                                                    required: false,
                                                                    message: "Please input your SSN!",
                                                                    whitespace: true
                                                                }
                                                            ]
                                                        })(<Input placeholder="SSN"/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8} push={1}>
                                                    <Form.Item>
                                                        {getFieldDecorator("SSNDataQuality", {
                                                            rules: [
                                                                {
                                                                    type: "array",
                                                                    required: true,
                                                                    message: "Please select Quality level of SSN Data!"
                                                                }
                                                            ]
                                                        })(<Cascader options={SSNDataQuality}
                                                                     placeholder="SSN Quality"/>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Panel>
                                        <Panel header="Date of Birth" key="3">
                                            <Row gutter={8}>
                                                <Col span={8} push={1}>
                                                    <Form.Item>
                                                        {getFieldDecorator('DOB', {
                                                            initialValue: this.state.homelessData.DOB ? moment(this.state.homelessData.DOB, 'YYYY/MM/DD') : moment("1993-06-28", 'YYYY/MM/DD'),
                                                            rules: [
                                                                {
                                                                    type: "object",
                                                                    required: false,
                                                                    message: "Please input your DOB!"
                                                                }
                                                            ]
                                                        })(<DatePicker/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8} push={1}>
                                                    <Form.Item>
                                                        {getFieldDecorator("DOBDataQuality", {
                                                            rules: [
                                                                {
                                                                    type: "array",
                                                                    required: true,
                                                                    message: "Please select Quality level of DOB Data!"
                                                                }
                                                            ]
                                                        })(<Cascader options={DOBDataQuality}
                                                                     placeholder="DOB Quality"/>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Panel>
                                        <Panel header="Contact Details" key="4">
                                            <Row gutter={8}>
                                                <Col span={4} push={1}>
                                                    <Form.Item>
                                                        {getFieldDecorator("PhoneNumberPrefix", {
                                                            initialValue: this.state.homelessData.PhoneNumberPrefix ? this.state.homelessData.PhoneNumberPrefix : '',
                                                            rules: [
                                                                {
                                                                    required: false,
                                                                    message: "Please input your Phone Number Prefix!",
                                                                    whitespace: true
                                                                }
                                                            ]
                                                        })(
                                                            <Select placeholder="Area Code">
                                                                <Option value="1">+1</Option>
                                                                <Option value="91">+91</Option>
                                                            </Select>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8} push={1}>
                                                    <Form.Item>
                                                        {getFieldDecorator("PhoneNumber", {
                                                            initialValue: this.state.homelessData.PhoneNumber ? this.state.homelessData.PhoneNumber : '',
                                                            rules: [
                                                                {
                                                                    required: false,
                                                                    message: "Please input your Phone Number!",
                                                                    whitespace: true
                                                                }
                                                            ]
                                                        })(<Input placeholder="Phone Number"/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8} push={1}>
                                                    <Form.Item>
                                                        {getFieldDecorator("email", {
                                                            initialValue: this.state.homelessData.Email ? this.state.homelessData.Email : '',
                                                            rules: [
                                                                {
                                                                    type: "email",
                                                                    message: "The input is not valid E-mail!"
                                                                },
                                                                {
                                                                    required: false,
                                                                    message: "Please input your E-mail!"
                                                                }
                                                            ]
                                                        })(<Input
                                                            prefix={<Icon type="mail"
                                                                          style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                            placeholder="E-mail"/>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Panel>
                                        <Panel header="Demographic Details" key="5">
                                            <Row gutter={8}>
                                                <Col span={8} push={1}>
                                                    <Form.Item>
                                                        {getFieldDecorator("Race", {
                                                            rules: [
                                                                {
                                                                    type: "array",
                                                                    required: true,
                                                                    message: "Please select your Race!"
                                                                }
                                                            ]
                                                        })(<Cascader options={Race} placeholder="Race"/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8} push={1}>
                                                    <Form.Item>
                                                        {getFieldDecorator("Ethnicity", {
                                                            rules: [
                                                                {
                                                                    type: "array",
                                                                    required: true,
                                                                    message: "Please select your Ethnicity!"
                                                                }
                                                            ]
                                                        })(<Cascader options={Ethnicity} placeholder="Ethnicity"/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8} push={1}>
                                                    <Form.Item>
                                                        {getFieldDecorator("Gender", {
                                                            rules: [
                                                                {
                                                                    type: "array",
                                                                    required: true,
                                                                    message: "Please select your Gender!"
                                                                }
                                                            ]
                                                        })(<Cascader options={Gender} placeholder="Gender"/>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Panel>
                                        <Panel header="Veteran Status" key="6">
                                            <Row gutter={8}>
                                                <Col span={8} push={1}>
                                                    <Form.Item>
                                                        {getFieldDecorator("VeteranStatus", {
                                                            rules: [
                                                                {
                                                                    type: "array",
                                                                    required: true,
                                                                    message: "Please select your Veteran Status!"
                                                                }
                                                            ]
                                                        })(<Cascader options={VeteranStatus}
                                                                     placeholder="Veteran Status"/>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Panel>
                                        <Panel style={{backgroundColor: "lightseagreen"}} header="Submit Form Here"
                                               key="7">
                                            <Row>
                                                <Col span={12} push={1}>
                                                    <p style={{padding: "2%"}}>
                                                        <Checkbox>
                                                            I acknowledge, the form is completed as per the inputs
                                                            provided
                                                            by the
                                                            client.
                                                        </Checkbox>
                                                    </p>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item>
                                                        <Button type="primary" block htmlType="submit"
                                                                className="registration-submit-button">
                                                            Update
                                                        </Button>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Panel>
                                    </Collapse>
                                </Form>
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
                        loggedInStatus={this.props.loggedInStatus}
                    />
                    <Layout>
                        <SiderComponent
                            setPagecomponent={this.setPagecomponent}
                        />
                        <Content className="content-login">
                            <div className="site-layout-content-login">
                                <span>Loading . . .<Spin size="small"/></span>
                            </div>
                        </Content>
                    </Layout>
                    <StreetCardFooter/>
                </Layout>
            );
        }


    }
}

const WrappedhomelessRegistration = Form.create({name: "register"})(
    homelessRegistration
);

export default WrappedhomelessRegistration;

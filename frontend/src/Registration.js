import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import {
  Form,
  Input,
  Cascader,
  Select,
  Button,
  AutoComplete,
  Icon,
  Row,
  Col,
  Layout,
  Menu,
  DatePicker
} from "antd";
import Header from "./Header";
import StreetCardFooter from './StreetCardFooter'

import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import moment from 'moment';

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

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const { Content, Sider } = Layout;

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

class RegistrationForm extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.props.username)
    this.setState({ username: this.props.username ? this.props.username : ''})
    this.handleSocialWorkerRegistrationSubmit = this.handleSocialWorkerRegistrationSubmit.bind(this);
    this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);
    this.homelessRegistration = this.homelessRegistration.bind(this);
    this.handleHomelessPersonRegistrationSubmit = this.handleHomelessPersonRegistrationSubmit.bind(this);

  }

  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    pageComponent: this.props.pageComponent
  };

  componentDidMount() {
    
  }

  handleSuccessfulLogoutAction() {
    this.props.handleLogout();
    this.props.history.push('/login');
  }

   handlePersonalIdSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {

      if (!err) {
        this.props.handleHomelessPersonData(values.personId);
        this.props.history.push('/homelessRegistration');
      }
    });
  };


  handleCreateAppointMentdSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {

      if (!err) {
        console.log(values.personId);
        this.props.handleHomelessPersonData(values.personId);
        this.props.history.push('/createAppointment');
      }
    });
  };

  handleEditAppointMentdSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {

      if (!err) {
        console.log(values.personId);
        this.props.handleHomelessPersonData(values.personId);
        this.props.history.push('/viewAppointment');
      }
    });

  };

  handleUpdateClientInformationdSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {

      if (!err) {
        fetch('http://localhost:8000/homeless/'+ values.personId + '/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(res => res.json())
          .then(json => {
            this.props.handleHomelessPersonJson(json);
            this.props.history.push('/homelessRegistration');
          });
        
      }
    });

  };

  viewLongs = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {

      if (!err) {
        this.props.handleHomelessPersonData(values.personId);
        this.props.history.push('/log');
      }
    });
  };

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

        fetch('http://localhost:8000/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(registerRequestObject)
        })
          .then(res => {
            console.log("akash");
            if(res.status == 201){
              this.props.history.push('/socialWorkerRegister');
            }
          });
          
      }
    });
  }

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };


  homelessRegistration() {
    this.props.handleHomelessPersonData('');
    this.props.history.push('/homelessRegistration');
  }

  handleClick = e => {
    if(e.key === '3'){
      this.setState({ pageComponent: 'newAppointMent' })
    }else if(e.key === '4'){
      this.setState({pageComponent : 'viewAppointment' })
    }else if(e.key === '1'){
      this.setState({ pageComponent: 'registerClient' })
    }else if(e.key === '2'){
      this.setState({ pageComponent: 'updateInformation' })
    }else if(e.key === '5'){
      this.setState({ pageComponent: 'loginfo' })
    }
  };

    handleHomelessPersonRegistrationSubmit = e => {
      e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {

      if (!err) {
        var registerRequestObject = {};
        //registerRequestObject.PersonalId = this.state.homelessData.PersonalId ? this.state.homelessData.PersonalId : Math.floor(100000 + Math.random() * 900000);
        registerRequestObject.FirstName =  values.FirstName ? values.FirstName : null;
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

        console.log(registerRequestObject);

        fetch('http://localhost:8000/homeless/', {
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
            this.props.history.push('/login');
          });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    console.log(this.state.pageComponent);
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
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

    if(this.props.clearanceLevel === "caseworker" && "shivamverma" !== this.props.username){
      if(this.state.pageComponent === 'registerClient'){
      return (
      <Layout className="layout">
      <Header 
        handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
        loggedInStatus={this.state.loggedInStatus}
      />
      <Layout>
        <Sider className="site-layout-sider"
        >
          <Menu 
            style={{ borderRight : '0px', backgroundColor: '#173e43' }} 
            mode="inline" defaultSelectedKeys={['1']}
            onClick={this.handleClick}
          >
            <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="1">
              <span>Register Client</span>
            </Menu.Item>
            <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="2">
              <span>Update Client Information</span>
            </Menu.Item>
            <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="3">
              <span>Schedule Appointment</span>
            </Menu.Item>
            <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="4">
              <span>View Appointment</span>
            </Menu.Item>
            <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="5">
              <span>View Logs</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content className="content">
          <div className="site-layout-content-registration-client">
           <Form {...formItemLayout} onSubmit={this.handleHomelessPersonRegistrationSubmit}>
          <h1 style={{marginLeft : '240px'}} >Register Client</h1>
          <Row className="register-ant-form-item-3">
            <Col span={8}>
              <Form.Item>
                {getFieldDecorator("FirstName", {
                  rules: [
                    {
                      required: false,
                      message: "Please input your First Name!",
                      whitespace: true
                    }
                  ]
                })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                {getFieldDecorator("MiddleName", {
                  rules: [
                    {
                      required: false,
                      message: "Please input your Middle Name!",
                      whitespace: true
                    }
                  ]
                })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Middle Name" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
            <Form.Item>
              {getFieldDecorator("LastName", {
                rules: [
                  {
                    required: false,
                    message: "Please input your Last Name!",
                    whitespace: true
                  }
                ]
              })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name"/>)}
            </Form.Item>
            </Col>
          </Row>
          <Row className="register-ant-form-item-2" >
            <Col span={12}>
              <Form.Item>
                {getFieldDecorator("NameSuffix", {
                  rules: [
                    {
                      required: false,
                      message: "Please input your Name Suffix!",
                      whitespace: true
                    }
                  ]
                })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name Suffix" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                {getFieldDecorator("NameDataQuality", {
                  rules: [
                    {
                      type: "array",
                      required: true,
                      message: "Please select Quality level of Name Data!"
                    }
                  ]
                })(<Cascader options={nameDataQuality}  placeholder="Name Quality" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row className="register-ant-form-item-2">
            <Col span={12}>
              <Form.Item>
                {getFieldDecorator("SSN", {
                  rules: [
                    {
                      required: false,
                      message: "Please input your SSN!",
                      whitespace: true
                    }
                  ]
                })(<Input placeholder="SSN" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                {getFieldDecorator("SSNDataQuality", {
                  rules: [
                    {
                      type: "array",
                      required: true,
                      message: "Please select Quality level of SSN Data!"
                    }
                  ]
                })(<Cascader options={SSNDataQuality} placeholder="SSN Quality"/>)}
              </Form.Item>
            </Col>
          </Row>
          <Row className="register-ant-form-item-2">
            <Col span={12}>
            <Form.Item>
              {getFieldDecorator('DOB', {
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
            <Col span={12}>
              <Form.Item>
                {getFieldDecorator("DOBDataQuality", {
                  rules: [
                    {
                      type: "array",
                      required: true,
                      message: "Please select Quality level of DOB Data!"
                    }
                  ]
                })(<Cascader options={DOBDataQuality} placeholder="DOB Quality" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row className="register-ant-form-item">
            <Col span={24}>
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
          </Row>
          <Row className="register-ant-form-item">
            <Col span={24}>
              <Form.Item>
                {getFieldDecorator("Ethnicity", {
                  rules: [
                    {
                      type: "array",
                      required: true,
                      message: "Please select your Ethnicity!"
                    }
                  ]
                })(<Cascader options={Ethnicity} placeholder="Ethnicity" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row className="register-ant-form-item">
            <Col span={24}>
              <Form.Item>
                {getFieldDecorator("Gender", {
                  rules: [
                    {
                      type: "array",
                      required: true,
                      message: "Please select your Gender!"
                    }
                  ]
                })(<Cascader options={Gender} placeholder="Gender" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row className="register-ant-form-item">
            <Col span={24}>
              <Form.Item>
                {getFieldDecorator("VeteranStatus", {
                  rules: [
                    {
                      type: "array",
                      required: true,
                      message: "Please select your Veteran Status!"
                    }
                  ]
                })(<Cascader options={VeteranStatus} placeholder="Veteran Status"/>)}
              </Form.Item>
            </Col>
          </Row>
          <Row className="register-ant-form-item">
            <Col span={24}>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" className="registration-submit-button">
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
    }else if(this.state.pageComponent == 'updateInformation'){
      return (
        <Layout className="layout">
          <Header 
            handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
            loggedInStatus={this.state.loggedInStatus}
          />
          <Layout>
             <Sider className="site-layout-sider"
            >
              <Menu 
                style={{ borderRight : '0px', backgroundColor: '#173e43' }} 
                mode="inline" defaultSelectedKeys={['1']}
                onClick={this.handleClick}
              >
                <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="1">
                  <span>Register Client</span>
                </Menu.Item>
                <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="2">
                  <span>Update Client Information</span>
                </Menu.Item>
                <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="3">
                  <span>Schedule Appointment</span>
                </Menu.Item>
                <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="4">
                  <span>View Appointment</span>
                </Menu.Item>
                <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="5">
                  <span>View Logs</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Content className="content">
              <div className="personId-form-input">
                <Form {...formItemLayout} onSubmit={this.handleUpdateClientInformationdSubmit.bind(this)}>
                  <Form.Item className="register-ant-form-item">
                    {getFieldDecorator("personId", {
                      rules: [
                        {
                          required: true,
                          message: "Please input Identification Number!",
                          whitespace: true
                        }
                      ]
                    })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="Client Identification Number" />)}
                  </Form.Item>
                  <Form.Item {...tailFormItemLayout} className="register-ant-form-item">
                    <Button type="primary" htmlType="submit" style={{ fontSize:22, width: '250px', height: '50px', marginLeft: '80px'}}>
                        Update Information 
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Content>
          </Layout>
          <StreetCardFooter/>
        </Layout>
      );
    }else if(this.state.pageComponent === 'viewAppointment'){
      return (
        <Layout className="layout">
          <Header 
            handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
            loggedInStatus={this.state.loggedInStatus}
          />
          <Layout>
             <Sider className="site-layout-sider"
            >
              <Menu 
                style={{ borderRight : '0px', backgroundColor: '#173e43' }} 
                mode="inline" defaultSelectedKeys={['1']}
                onClick={this.handleClick}
              >
                <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="1">
                  <span>Register Client</span>
                </Menu.Item>
                <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="2">
                  <span>Update Client Information</span>
                </Menu.Item>
                <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="3">
                  <span>Schedule Appointment</span>
                </Menu.Item>
                <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="4">
                  <span>View Appointment</span>
                </Menu.Item>
                <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="5">
                  <span>View Logs</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Content className="content">
              <div className="personId-form-input">
                <Form {...formItemLayout} onSubmit={this.handleEditAppointMentdSubmit.bind(this)}>
                  <Form.Item className="register-ant-form-item">
                    {getFieldDecorator("personId", {
                      rules: [
                        {
                          required: true,
                          message: "Please input Identification Number!",
                          whitespace: true
                        }
                      ]
                    })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="Client Identification Number" />)}
                  </Form.Item>
                  <Form.Item {...tailFormItemLayout} className="register-ant-form-item">
                    <Button type="primary" htmlType="submit" style={{ fontSize:22, width: '250px', height: '50px', marginLeft: '80px'}}>
                        View Appointment
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Content>
          </Layout>
          <StreetCardFooter/>
        </Layout>
      );
    }else if(this.state.pageComponent === 'newAppointMent'){
      return (
        <Layout className="layout">
          <Header 
            handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
            loggedInStatus={this.state.loggedInStatus}
          />
          <Layout>
             <Sider className="site-layout-sider"
            >
              <Menu 
                style={{ borderRight : '0px', backgroundColor: '#173e43' }} 
                mode="inline" defaultSelectedKeys={['1']}
                onClick={this.handleClick}
              >
                <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="1">
                  <span>Register Client</span>
                </Menu.Item>
                <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="2">
                  <span>Update Client Information</span>
                </Menu.Item>
                <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="3">
                  <span>Schedule Appointment</span>
                </Menu.Item>
                <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="4">
                  <span>View Appointment</span>
                </Menu.Item>
                <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="5">
                  <span>View Logs</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Content className="content">
              <div className="personId-form-input">
                <Form {...formItemLayout} onSubmit={this.handleCreateAppointMentdSubmit.bind(this)}>
                  <Form.Item className="register-ant-form-item">
                    {getFieldDecorator("personId", {
                      rules: [
                        {
                          required: true,
                          message: "Please input Identification Number!",
                          whitespace: true
                        }
                      ]
                    })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="Client Identification Number" />)}
                  </Form.Item>
                  <Form.Item {...tailFormItemLayout} className="register-ant-form-item">
                    <Button type="primary" htmlType="submit" style={{ fontSize:22, width: '250px', height: '50px', marginLeft: '80px'}}>
                        Create Appointment
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Content>
          </Layout>
          <StreetCardFooter/>
        </Layout>
      );
    }else if(this.state.pageComponent === 'loginfo'){
      return (
        <Layout className="layout">
          <Header 
            handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
            loggedInStatus={this.state.loggedInStatus}
          />
          <Layout>
             <Sider className="site-layout-sider"
            >
              <Menu 
                style={{ borderRight : '0px', backgroundColor: '#173e43' }} 
                mode="inline" defaultSelectedKeys={['1']}
                onClick={this.handleClick}
              >
                <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="1">
                  <span>Register Client</span>
                </Menu.Item>
                <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="2">
                  <span>Update Client Information</span>
                </Menu.Item>
                <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="3">
                  <span>Schedule Appointment</span>
                </Menu.Item>
                <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="4">
                  <span>View Appointment</span>
                </Menu.Item>
                <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="5">
                  <span>View Logs</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Content className="content">
              <div className="personId-form-input">
                <Form {...formItemLayout} onSubmit={this.viewLongs.bind(this)}>
                  <Form.Item className="register-ant-form-item">
                    {getFieldDecorator("personId", {
                      rules: [
                        {
                          required: true,
                          message: "Please input Identification Number!",
                          whitespace: true
                        }
                      ]
                    })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="Client Identification Number" />)}
                  </Form.Item>
                  <Form.Item {...tailFormItemLayout} className="register-ant-form-item">
                    <Button type="primary" htmlType="submit" style={{ fontSize:22, width: '250px', height: '50px', marginLeft: '80px'}}>
                        View Log
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Content>
          </Layout>
          <StreetCardFooter/>
        </Layout>
      );
    }
    }else{
      return (
      <Layout className="layout">
      <Header 
        handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
        loggedInStatus={this.state.loggedInStatus}
      />
      <Layout>
        <Content className="content">
          <div className="site-layout-content-registration">
            <Form {...formItemLayout} onSubmit={this.handleSocialWorkerRegistrationSubmit} >
              <h1 style={{marginLeft: '90px', marginLeft : '180px'}}>Register Social Worker</h1>
              <Form.Item className="register-ant-form-item">
                {getFieldDecorator("username", {
                  initialValue: this.state.username,
                  rules: [
                    {
                      required: true,
                      message: "Please input your username!",
                      whitespace: true
                    }
                  ]
                })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
              </Form.Item>
              <Form.Item hasFeedback className="register-ant-form-item">
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
                })(<Input.Password  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password"/>)}
              </Form.Item>
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
                })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Confirm Password" onBlur={this.handleConfirmBlur} />)}
              </Form.Item >
              <Form.Item className="register-ant-form-item">
                {getFieldDecorator("email", {
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
                })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="E-mail"/>)}
              </Form.Item>
              <Form.Item className="register-ant-form-item">
                {getFieldDecorator("first_name", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your first name!",
                      whitespace: true
                    }
                  ]
                })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name"/>)}
              </Form.Item>
              <Form.Item className="register-ant-form-item">
                {getFieldDecorator("last_name", {
                  rules: [
                    {
                      message: "Please input your last name!",
                      whitespace: true
                    }
                  ]
                })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name"/>)}
              </Form.Item>
              <Form.Item className="register-ant-form-item">
                {getFieldDecorator("address", {
                  rules: [
                    {
                      message: "Please input your address!",
                      whitespace: true
                    }
                  ]
                })(<Input prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Address"/>)}
              </Form.Item>
              <Form.Item className="register-ant-form-item">
                {getFieldDecorator("clearanceLevel", {
                  rules: [
                    {
                      type: "array",
                      required: true,
                      message: "Please select your role!"
                    }
                  ]
                })(<Cascader options={clearanceLevel} placeholder="Clearence Level" />)}
              </Form.Item>
              <Form.Item className="register-ant-form-item">
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
              <Form.Item {...tailFormItemLayout} className="register-ant-form-item">
                <Button type="primary" htmlType="submit" className="registration-submit-button">
                  Submit
                </Button>
              </Form.Item>
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

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

export default WrappedRegistrationForm;

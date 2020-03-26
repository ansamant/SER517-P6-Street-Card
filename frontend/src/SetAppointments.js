
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Form, DatePicker, TimePicker, Button, Icon, Cascader, Input, Descriptions, Layout, Menu, Card, Row, Col, Checkbox } from 'antd';
import WrappedViewAppointments from "./ViewAppointments";
import Header from "./Header";
import StreetCardFooter from './StreetCardFooter'



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

const { Content, Sider } = Layout;

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};


class SetAppointments extends React.Component {

  constructor(props) {
      super(props);
      console.log(this.props.homelessPersonId);
      this.state = {
          items: {},
          checked: false,
          email: null,
          isLoaded: false,
      }
      this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);
    }
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
          var appointmentRequestObject = {};
        appointmentRequestObject.office = values.office;
        appointmentRequestObject.streetAddress1 = values.streetAddress1;
        appointmentRequestObject.streetAddress2 = values.streetAddress2;
        appointmentRequestObject.city = values.city;
        appointmentRequestObject.zipCode = values.zipCode;
        appointmentRequestObject.state = values.state;
        appointmentRequestObject.Date = values['DatePicker'].format('YYYY-MM-DD');
        appointmentRequestObject.Time = values['TimePicker'].format('hh:mm[:ss[.uuuuuu]]');
        appointmentRequestObject.serviceProvider = values.serviceProvider[0];
        appointmentRequestObject.personalId = this.props.homelessPersonId;
        appointmentRequestObject.alert = this.state.checked;
        appointmentRequestObject.Email = this.state.email;
        if(this.state.email == null){
          appointmentRequestObject.Email = ""
        }
        //appointmentRequestObject.email = this.state.Email
        console.log("EMAIL", this.state.email)
        console.log("ALERT", appointmentRequestObject.alert)
        console.log(appointmentRequestObject);
        fetch('http://localhost:8000/homeless/' + this.props.homelessPersonId + '/appointment/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(appointmentRequestObject)
        })
          .then(res => res.json())
          .then(json => {
            this.props.history.push('/socialWorkerRegister');
          });
      }

      console.log('Received values of form: ', values);
    });
  };


  componentDidMount() {
     fetch('http://127.0.0.1:8000/homeless/' + this.props.homelessPersonId + '/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        })
         .then(res => res.json())
         .then(json => {
             console.log(json)
             this.setState({
                 isLoaded: true,
                 alert: false,
                 items:json
                 }
             )
         })
      console.log(this.items);

  }



handleSuccessfulLogoutAction() {
    this.props.handleLogout();
    this.props.history.push('/login');
  }

   handleClick = e => {
    if(e.key === '3'){
      this.props.updatePageComponent('newAppointMent')
      this.props.history.push('/socialWorkerRegister');
    }else if(e.key === '4'){
      this.props.updatePageComponent('viewAppointment')
      this.props.history.push('/socialWorkerRegister');
    }else if(e.key === '1'){
      this.props.updatePageComponent('registerClient')
      this.props.history.push('/socialWorkerRegister');
    }else if(e.key === '2'){
      this.props.updatePageComponent('updateInformation')
      this.props.history.push('/socialWorkerRegister');
    }else if(e.key === '5'){
      this.props.updatePageComponent('loginfo')
      this.props.history.push('/socialWorkerRegister');
    }else if (e.key === '6') {
        this.setState({pageComponent: 'projectenroll'})
        this.props.history.push('/socialWorkerRegister');
    }
  };

  onChange = e => {
    console.log('checked = ', e.target.checked);
    this.setState({
      checked: e.target.checked,
    });
  };

  render() {
      const {items} = this.state;
      const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
          },
        };
    const config = {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    };
    //console.log("Email " + items.Email)
    if(items.Email != null){
      this.state.email = items.Email;
      console.log("Email2", this.state.email)
      return (
        <Layout className="layout">
          <Header 
                  handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                  loggedInStatus={this.props.loggedInStatus}
          />
          <Layout>
            <Sider className="site-layout-sider"
            >
              <Menu 
                style={{ borderRight : '0px', backgroundColor: '#173e43' }} 
                mode="inline" defaultSelectedKeys={['3']}
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
                <Menu.Item style={{marginTop: '20px', color: '#fae596'}} key="6">
                    <span>Project Enrollment</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Content className="content">
                <Row gutter={16}>
                  <Col span={8}>
                    <Card style={{ borderRadius: '25px' }} title="Client Id" bordered={false}>
                      {items.PersonalId}
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card style={{ borderRadius: '25px' }} title="First Name" bordered={false}>
                      {items.FirstName}
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card style={{ borderRadius: '25px' }} title="Last Name" bordered={false}>
                      {items.LastName}
                    </Card>
                  </Col>
                </Row>
              <div className="site-layout-content-setappointment">
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className="set-appointment-form">
                <h1 style={{marginLeft: '90px', marginLeft : '180px'}} >Appointment Details:</h1>
                  <Form.Item className="register-ant-form-item" >
                  {getFieldDecorator("serviceProvider", {
                    rules: [
                      {
                        type: "array",
                        required: true,
                        message: "Please select your role!"
                      }
                    ]
                  })(<Cascader options={serviceProvider} placeholder="Service Provider" />)}
                </Form.Item>
                <Form.Item className="register-ant-form-item" >
                  {getFieldDecorator("office", {
                    rules: [
                      {
                        message: "Please input the office!",
                        whitespace: true
                      }
                    ]
                  })(<Input placeholder="Office Name"/>)}
                </Form.Item>
                 <Form.Item className="register-ant-form-item" >
                  {getFieldDecorator("streetAddress1", {
                    rules: [
                      {
                        message: "Please input the streetAddress1!",
                        whitespace: true
                      }
                    ]
                  })(<Input placeholder="Street Address 1"/>)}
                </Form.Item>
                    <Form.Item className="register-ant-form-item" >
                  {getFieldDecorator("streetAddress2", {
                    rules: [
                      {
                        message: "Please input the streetAddress2!",
                        whitespace: true
                      }
                    ]
                  })(<Input placeholder="Street Address 2"/>)}
                </Form.Item>

                <Form.Item className="register-ant-form-item" >
                  {getFieldDecorator("city", {
                    rules: [
                      {
                        message: "Please input the city!",
                        whitespace: true
                      }
                    ]
                  })(<Input placeholder="City"/>)}
                </Form.Item>
                <Form.Item className="register-ant-form-item" >
                  {getFieldDecorator("zipCode", {
                    rules: [
                      {
                        message: "Please input the zipcode!",
                        whitespace: true
                      }
                    ]
                  })(<Input placeholder="Zip Code"/>)}
                </Form.Item>
                <Form.Item className="register-ant-form-item" >
                  {getFieldDecorator("state", {
                    rules: [
                      {
                        message: "Please input the state!",
                        whitespace: true
                      }
                    ]
                  })(<Input placeholder="State"/>)}
                </Form.Item>
                  <Form.Item className="register-ant-form-item" >
                  {getFieldDecorator('DatePicker', {
                  //	initialValue: this.state.homelessData.DOB ? moment(this.state.homelessData.DOB, 'YYYY/MM/DD') : moment("1993-06-28", 'YYYY/MM/DD'),
                  	rules: [
                      {
                      	type: "object",
                        required: true,
                        message: "Please input your Date!"
                      }
                    ]
                  })(<DatePicker placeholder="Appointment Date"/>)}
                </Form.Item>
                  <Form.Item className="register-ant-form-item" >
                  {getFieldDecorator('TimePicker', {
                  //	initialValue: this.state.homelessData.DOB ? moment(this.state.homelessData.DOB, 'YYYY/MM/DD') : moment("1993-06-28", 'YYYY/MM/DD'),
                  	rules: [
                      {
                      	type: "object",
                        required: true,
                        message: "Please input your Time!"
                      }
                    ]
                  })(<TimePicker placeholder="Time Date" />)}
                </Form.Item>
                <Form.Item className="register-ant-form-item">
                    <Checkbox checked={this.state.checked} onChange={this.onChange}>Set Alert</Checkbox>
                </Form.Item>
                <Form.Item className="register-ant-form-item">
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
    else{
      return (
        <Layout className="layout">
          <Header 
                  handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                  loggedInStatus={this.props.loggedInStatus}
          />
          <Layout>
            <Sider className="site-layout-sider"
            >
              <Menu 
                style={{ borderRight : '0px', backgroundColor: '#173e43' }} 
                mode="inline" defaultSelectedKeys={['3']}
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
                <Menu.Item style={{marginTop: '20px', color: '#fae596'}} key="6">
                    <span>Project Enrollment</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Content className="content">
                <Row gutter={16}>
                  <Col span={8}>
                    <Card style={{ borderRadius: '25px' }} title="Client Id" bordered={false}>
                      {items.PersonalId}
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card style={{ borderRadius: '25px' }} title="First Name" bordered={false}>
                      {items.FirstName}
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card style={{ borderRadius: '25px' }} title="Last Name" bordered={false}>
                      {items.LastName}
                    </Card>
                  </Col>
                </Row>
              <div className="site-layout-content-setappointment">
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className="set-appointment-form">
                <h1 style={{marginLeft: '90px', marginLeft : '180px'}} >Appointment Details:</h1>
                  <Form.Item className="register-ant-form-item" >
                  {getFieldDecorator("serviceProvider", {
                    rules: [
                      {
                        type: "array",
                        required: true,
                        message: "Please select your role!"
                      }
                    ]
                  })(<Cascader options={serviceProvider} placeholder="Service Provider" />)}
                </Form.Item>
                <Form.Item className="register-ant-form-item" >
                  {getFieldDecorator("office", {
                    rules: [
                      {
                        message: "Please input the office!",
                        whitespace: true
                      }
                    ]
                  })(<Input placeholder="Office Name"/>)}
                </Form.Item>
                 <Form.Item className="register-ant-form-item" >
                  {getFieldDecorator("streetAddress1", {
                    rules: [
                      {
                        message: "Please input the streetAddress1!",
                        whitespace: true
                      }
                    ]
                  })(<Input placeholder="Street Address 1"/>)}
                </Form.Item>
                    <Form.Item className="register-ant-form-item" >
                  {getFieldDecorator("streetAddress2", {
                    rules: [
                      {
                        message: "Please input the streetAddress2!",
                        whitespace: true
                      }
                    ]
                  })(<Input placeholder="Street Address 2"/>)}
                </Form.Item>

                <Form.Item className="register-ant-form-item" >
                  {getFieldDecorator("city", {
                    rules: [
                      {
                        message: "Please input the city!",
                        whitespace: true
                      }
                    ]
                  })(<Input placeholder="City"/>)}
                </Form.Item>
                <Form.Item className="register-ant-form-item" >
                  {getFieldDecorator("zipCode", {
                    rules: [
                      {
                        message: "Please input the zipcode!",
                        whitespace: true
                      }
                    ]
                  })(<Input placeholder="Zip Code"/>)}
                </Form.Item>
                <Form.Item className="register-ant-form-item" >
                  {getFieldDecorator("state", {
                    rules: [
                      {
                        message: "Please input the state!",
                        whitespace: true
                      }
                    ]
                  })(<Input placeholder="State"/>)}
                </Form.Item>
                  <Form.Item className="register-ant-form-item" >
                  {getFieldDecorator('DatePicker', {
                  //	initialValue: this.state.homelessData.DOB ? moment(this.state.homelessData.DOB, 'YYYY/MM/DD') : moment("1993-06-28", 'YYYY/MM/DD'),
                  	rules: [
                      {
                      	type: "object",
                        required: true,
                        message: "Please input your Date!"
                      }
                    ]
                  })(<DatePicker placeholder="Appointment Date"/>)}
                </Form.Item>
                  <Form.Item className="register-ant-form-item" >
                  {getFieldDecorator('TimePicker', {
                  //	initialValue: this.state.homelessData.DOB ? moment(this.state.homelessData.DOB, 'YYYY/MM/DD') : moment("1993-06-28", 'YYYY/MM/DD'),
                  	rules: [
                      {
                      	type: "object",
                        required: true,
                        message: "Please input your Time!"
                      }
                    ]
                  })(<TimePicker placeholder="Time Date" />)}
                </Form.Item>
                <Form.Item className="register-ant-form-item">
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

const WrappedSetAppointments = Form.create({ name: 'time_related_controls' })(SetAppointments);


export default WrappedSetAppointments;

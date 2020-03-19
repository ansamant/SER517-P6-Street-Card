import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
// import { Form, Input, Button} from 'antd';
import {AutoComplete, Button, Cascader, Col, DatePicker, Form, Icon, Input, Layout, Menu, Row, Select} from "antd";
import Header from './Header'
import StreetCardFooter from './StreetCardFooter'

const {Content, Sider} = Layout;
class GreeterView extends React.Component{


  constructor(props) {
    super(props);
     console.log(this.props.clearanceLevel);
     console.log(this.props.serviceProvider);
    this.state = {
        isLoaded: false,
        name : "",
        clearanceLevel:this.props.clearanceLevel,
        serviceProvider:this.props.serviceProvider
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
        //registerRequestObject.serviceProvider = "FP";
       //registerRequestObject.serviceProvider = this.state.clearanceLevel;
        registerRequestObject.serviceProvider = this.state.serviceProvider;
        registerRequestObject.clientName= "";
        console.log(registerRequestObject);
        fetch('http://localhost:8000/homeless/' + values.personalId + '/',{
          method : 'GET',
          headers: {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
          
        })
        .then(res => res.json())
        .then(json=>{
          // Need name to be used in the header for easy mapping of client name.
          registerRequestObject.clientName = json['FirstName'] + ' ' + json['LastName']
          //console.log("REG1 " + registerRequestObject.clientName)
          this.setState({
            isLoaded: true,
            name : registerRequestObject.clientName,
          })
          
        }).then(json=>{
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

    render(){
       // const {items} = this.state;
        const {name}  = this.state;
        const{isLoaded} = this.state;
        const { getFieldDecorator } = this.props.form;
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
        if(this.state.isLoaded == true){
          return (
            <Layout className="layout">
                <Header
                    handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                    loggedInStatus={this.state.loggedInStatus}
                />
                    <Content className="content">
                    <center><h2>Hello {this.state.name}</h2></center> 
                        <div className="personId-form-input">
                            <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                                <Form.Item className="register-ant-form-item">
                                    {getFieldDecorator("personId", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "Please input Identification Number!",
                                                whitespace: true
                                            }
                                        ]
                                    })(<Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                              placeholder="Client Identification Number"/>)}
                                </Form.Item>
                                <Form.Item {...tailFormItemLayout} className="register-ant-form-item">
                                    <Button type="primary" htmlType="submit" style={{
                                        fontSize: 22,
                                        width: '250px',
                                        height: '50px',
                                        marginLeft: '80px'
                                    }}>
                                        Submit
                                    </Button>
                                </Form.Item>
                                     
                            </Form>
                        </div>
                    </Content>
                <StreetCardFooter/>
            </Layout>
          );
        }else{
        return (
            <Layout className="layout">
                <Header
                    handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                    loggedInStatus={this.state.loggedInStatus}
                />
                    <Content className="content">
                        <div className="personId-form-input">
                            <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                                <Form.Item className="register-ant-form-item">
                                    {getFieldDecorator("personId", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "Please input Identification Number!",
                                                whitespace: true
                                            }
                                        ]
                                    })(<Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                              placeholder="Client Identification Number"/>)}
                                </Form.Item>
                                <Form.Item {...tailFormItemLayout} className="register-ant-form-item">
                                    <Button type="primary" htmlType="submit" style={{
                                        fontSize: 22,
                                        width: '250px',
                                        height: '50px',
                                        marginLeft: '80px'
                                    }}>
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Content>
                <StreetCardFooter/>
            </Layout>
        );
        }
        
    }
}

//ReactDOM.render(<Greeter/>, document.getElementById('greeter'));

const WrappedGreeterForm = Form.create({ name: "greeter" })(
    GreeterView
  );
  
  export default WrappedGreeterForm;
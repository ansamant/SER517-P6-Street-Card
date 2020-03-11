import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Input, Button} from 'antd';
import Header from './Header'
import StreetCardFooter from './StreetCardFooter'

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
          console.log("JSON" + json)
          // Need name to be used in the header for easy mapping of client name.
          registerRequestObject.clientName = json['FirstName'] + ' ' + json['LastName']
          this.setState({
            isLoaded: true,
            name : registerRequestObject.clientName,
          })
        });

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
          return(
            <div>

                <Header 
                  handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                  loggedInStatus={this.state.loggedInStatus}
                />,
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className="registration-form">
                    <h1 style={{ marginLeft: '300px'}}>Enter Id </h1>
                    <Form.Item label="clientID">
                        {getFieldDecorator("personalId", {
                            rules: [
                            {
                                required: true,
                                message: "Please input personalId!",
                                whitespace: true
                            }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" className="registration-submit-button">
                            Submit
                        </Button>
                    </Form.Item>
                     <center><h2>Hello {this.state.name}</h2></center> 
                </Form>
                <StreetCardFooter/>
            </div>
          );
        }else{
          return(
            <div>

                <Header 
                    handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                    loggedInStatus={this.state.loggedInStatus}
                />,
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className="registration-form">
                    <h1 style={{ marginLeft: '300px'}}>Enter Id</h1>
                    <Form.Item label="clientID">
                        {getFieldDecorator("personalId", {
                            rules: [
                            {
                                required: true,
                                message: "Please input personalId!",
                                whitespace: true
                            }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button style={{ left: '300px'}} type="primary" htmlType="submit" className="registration-submit-button">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <StreetCardFooter/>
            </div>
        );
        }
        
    }
}

//ReactDOM.render(<Greeter/>, document.getElementById('greeter'));

const WrappedGreeterForm = Form.create({ name: "greeter" })(
    GreeterView
  );
  
  export default WrappedGreeterForm;

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
  Icon
} from "antd";
import Header from "./Header";
import StreetCardFooter from './StreetCardFooter'

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

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
  }

  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  componentDidMount() {
    console.log("componentDidMount");
    if(this.props.loggedInStatus === "LOGGED_IN" && this.props.username !== "shivamverma"){
     var localClearanceLevel = ''
     fetch('http://localhost:8000/user/' + this.props.username + '/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(res => res.json())
          .then(json => {
            console.log("something", json);
          localClearanceLevel = json.user.socialWorker.clearanceLevel;
          console.log(localClearanceLevel);
          this.setState({
              clearanceLevel: localClearanceLevel
            });
      });
    }
  }

  handleSuccessfulLogoutAction() {
    this.props.handleLogout();
    this.props.history.push('/login');
  }

   handlePersonalIdSubmit = e => {
    e.preventDefault();
    this.props.history.push('/homelessRegistration');
    this.props.form.validateFieldsAndScroll((err, values) => {

      if (!err) {
        this.props.handleHomelessPersonData(values.personId);
        this.props.history.push('/homelessRegistration');
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
              this.props.history.push('/login');
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

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

    if(this.state.clearanceLevel === "caseworker" && "shivamverma" !== this.props.username){
      return (
      <div>
      <Header 
        handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
        loggedInStatus={this.state.loggedInStatus}
      />
      <div className="caseworker-homeless-field">
        <Button onClick={this.homelessRegistration} className="caseworker-homeless-registration-button" type="primary" block>Register Homeless Person</Button>
      </div>
      <div className="personId-form-input">
        <Form {...formItemLayout} onSubmit={this.handlePersonalIdSubmit} className="personId-form">
          <Form.Item>
            {getFieldDecorator("personId", {
              rules: [
                {
                  required: true,
                  message: "Please input Identification Number!",
                  whitespace: true
                }
              ]
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="Homeless Person Identification Number" />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" style={{ width: '150px', marginLeft: '160px' }}>
              Search
            </Button>
          </Form.Item>
        </Form>
      </div>
      <StreetCardFooter/>
      </div>
    );
    }else{
      return (
      <div>
      <Header 
        handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
        loggedInStatus={this.state.loggedInStatus}
      />

        <Form {...formItemLayout} onSubmit={this.handleSocialWorkerRegistrationSubmit} className="registration-form ">
          <h1 style={{marginLeft: '90px'}}>Register Social Worker</h1>
        <Form.Item>
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
          })(<Input.Password  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password"/>)}
        </Form.Item>
        <Form.Item hasFeedback>
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
        </Form.Item>
        <Form.Item u>
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
        <Form.Item >
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
        <Form.Item >
          {getFieldDecorator("last_name", {
            rules: [
              {
                message: "Please input your last name!",
                whitespace: true
              }
            ]
          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name"/>)}
        </Form.Item>
        <Form.Item >
          {getFieldDecorator("address", {
            rules: [
              {
                message: "Please input your address!",
                whitespace: true
              }
            ]
          })(<Input prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Address"/>)}
        </Form.Item>
        <Form.Item >
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
        <Form.Item >
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
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" className="registration-submit-button">
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

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

export default WrappedRegistrationForm;

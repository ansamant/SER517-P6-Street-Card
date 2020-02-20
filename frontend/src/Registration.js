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
  AutoComplete
} from "antd";
import Header from "./Header";

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

    this.handleSocialWorkerRegistrationSubmit = this.handleSocialWorkerRegistrationSubmit.bind(this);
    this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);
  }

  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };


  handleSuccessfulLogoutAction() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
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

        fetch('http://localhost:8000/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          },
          body: JSON.stringify(registerRequestObject)
        })
          .then(res => res.json())
          .then(json => {
            console.log("register response:", json);
            this.props.history.push('/login');
          });
      }
    });
  };

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

    return (
      <div>
      <Header 
        handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
        loggedInStatus={this.state.loggedInStatus}
      />

        <Form {...formItemLayout} onSubmit={this.handleSocialWorkerRegistrationSubmit} className="registration-form ">
          <h1>Fill the details of social worker for registration:</h1>
        <Form.Item label="User Name">
          {getFieldDecorator("username", {
            rules: [
              {
                required: true,
                message: "Please input your username!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
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
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
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
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item label="E-mail">
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
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Frist Name">
          {getFieldDecorator("first_name", {
            rules: [
              {
                required: true,
                message: "Please input your first name!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Last Name">
          {getFieldDecorator("last_name", {
            rules: [
              {
                message: "Please input your last name!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Address">
          {getFieldDecorator("address", {
            rules: [
              {
                message: "Please input your address!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Clearence Level">
          {getFieldDecorator("clearanceLevel", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select your role!"
              }
            ]
          })(<Cascader options={clearanceLevel} />)}
        </Form.Item>
        <Form.Item label="Service Provider">
          {getFieldDecorator("serviceProvider", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select your role!"
              }
            ]
          })(<Cascader options={serviceProvider} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

export default WrappedRegistrationForm;

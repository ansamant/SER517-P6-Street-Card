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
import Header from "./HeaderRegistration";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const roles = [
  {
    value: "Greeter",
    label: "Greeter"
  },
  {
    value: "Case Worker",
    label: "Case Worker"
  },
  {
    value: "Navigator",
    label: "Navigator"
  },
  {
    value: "Service Provider Employee",
    label: "Service Provider Employee"
  }
];

const TITLE = 'Register Social worker'

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
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
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "86"
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <div>
      <Header/>

        <Form {...formItemLayout} onSubmit={this.handleSubmit} className="registration-form ">
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
          {getFieldDecorator("firstname", {
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
          {getFieldDecorator("lastname", {
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
          {getFieldDecorator("roles", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select your role!"
              }
            ]
          })(<Cascader options={roles} />)}
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

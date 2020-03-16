import { Form, Icon, Input, Button } from "antd";
import React, { Component } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
};

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 8
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 48
    }
  }
};

const FormItem = Form.Item;

class LoginForm extends Component {
  render() {
    return (
      <Form {...formItemLayout} layout="inline">
        <FormItem>
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </FormItem>
        <FormItem>
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}
export default LoginForm;

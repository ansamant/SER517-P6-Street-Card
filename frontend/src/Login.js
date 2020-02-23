import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import Header from './Header'
import StreetCardFooter from './StreetCardFooter'
import WrappedRegistrationForm from './Registration'

 class NormalLoginForm extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      loginPageStatus: "LOGIN_HEADER"
    };
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }



  handleLoginSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        fetch('http://localhost:8000/api/token/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })
          .then(res => res.json())
          .then(json => {
            this.props.handleLogin(json,values.username);
            this.props.history.push('/socialWorkerRegister');
          });
        }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    let form;
    form = <div>
              <Header loginPageStatus={this.state.loginPageStatus} />
              <Form onSubmit={this.handleLoginSubmit} className="login-form">
                <Form.Item>
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="Username"
                    />,
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                    <Input
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="Password"
                    />,
                  )}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                  </Button>
                </Form.Item>
              </Form>
              <StreetCardFooter/>
            </div>;
    return (
      <div>{form}</div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm

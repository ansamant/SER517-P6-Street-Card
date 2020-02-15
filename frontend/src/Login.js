import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import Header from './HeaderCommon.js'
import StreetCardFooter from './StreetCardFooter'
import WrappedRegistrationForm from './Registration'

 class NormalLoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayed_form: 'login',
      logged_in: localStorage.getItem('access_token') ? true : false,
      username: ''
    };
  }


  handleSubmit = e => {
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
            localStorage.setItem('access_token', json.access);
            localStorage.setItem('refresh_token', json.refresh);
            this.setState({
              displayed_form: 'signup',
              logged_in: true,
              username: values.username
            });
          });
        }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <div>
                  <Header/>
                  <Form onSubmit={this.handleSubmit} className="login-form">
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
        break;
      case 'signup':
        form = <WrappedRegistrationForm />;
        break;
      default:
        form = null;
    }
    return (
      <div>{form}</div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm

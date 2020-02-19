
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Form, DatePicker, TimePicker, Button,  Cascader, Input, Descriptions } from 'antd';
import Header from './HeaderCommon.js'
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
class SetAppointments extends React.Component {
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      // Should format date value before submit.
      const values = {
        ...fieldsValue,
        'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
        'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
      };
      console.log('Received values of form: ', values);
    });
  };

  render() {
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
    return (
        <div>
          <Header/>
      <Form {...formItemLayout} onSubmit={this.handleSubmit} className="set-appointment-form">
          <h1>Client Details:</h1>
          <Form.Item >
        <Descriptions >
        <Descriptions.Item label="Personal-ID">1810000000</Descriptions.Item>
        <Descriptions.Item label="First Name">Prashansa</Descriptions.Item>
        <Descriptions.Item label="Last Name">Prakash</Descriptions.Item>
        </Descriptions>
       </Form.Item>
        <h1>Fill the details of new appointment here:</h1>
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
       <Form.Item label="Venue">
          {getFieldDecorator("venue", {
            rules: [
              {
                message: "Please input the venue!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="DatePicker">
          {getFieldDecorator('date-picker', config)(<DatePicker />)}
        </Form.Item>
        <Form.Item label="TimePicker">
          {getFieldDecorator('time-picker', config)(<TimePicker />)}
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
          <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}
        >
          <Button type="primary" htmlType="back">
            Back
          </Button>
        </Form.Item>
      </Form>
              <StreetCardFooter/>
          </div>
    );
  }
}

const WrappedSetAppointments = Form.create({ name: 'time_related_controls' })(SetAppointments);


export default WrappedSetAppointments;

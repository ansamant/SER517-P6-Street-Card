import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Form, DatePicker, TimePicker, Button, Icon,  Cascader, Input, AutoComplete, notification } from 'antd';
import WrappedViewAppointments from "./ViewAppointments";
import Header from './HeaderCommon.js'
import moment from 'moment';
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

class EditAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appointment: {},
            isLoaded: false,
        }
    }
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
          var appointmentRequestObject = {};
          console.log()
        appointmentRequestObject.venue = values.venue;
        appointmentRequestObject.Date = values['DatePicker'].format('YYYY-MM-DD');
        appointmentRequestObject.Time = values['TimePicker'].format('hh:mm:ss');
        appointmentRequestObject.serviceProvider = values.serviceProvider[0];

        console.log(appointmentRequestObject);
        fetch('http://127.0.0.1:8000/homeless/' + 4808684002 + '/appointment/' + 'TcTBwoyHA9xCDGXgEX7e78OEUE4zHqTr' + '/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          },
          body: JSON.stringify(appointmentRequestObject)
        })
          .then(res => res.json())
          .then(json => {
            console.log("appointment response:", json);
          });
      }

      console.log('Received values of form: ', values);
    });
  };


  componentDidMount() {
     fetch('http://127.0.0.1:8000/homeless/' + 4808684002 + '/appointment/' + 'TcTBwoyHA9xCDGXgEX7e78OEUE4zHqTr' + '/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          },
        })
         .then(res => res.json())
         .then(json => {
             console.log(json)

         })
        console.log(this.state.appointment);

  }


  render() {
      const {appointment} = this.state;
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
      <Form {...formItemLayout} onSubmit={this.handleSubmit} className="edit-appointment-form">

        <h1>Edit the details of appointment here:</h1>
          <Form.Item label="Service Provider">
          {getFieldDecorator("serviceProvider", {
              initialValue: appointment.serviceProvider,
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
              initialValue: appointment.venue,
            rules: [
              {
                message: "Please input the venue!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
          <Form.Item label="Appointment Date : ">
          {getFieldDecorator('DatePicker', {
              initialValue: appointment.Date ? moment(appointment.Date, 'YYYY/MM/DD') : moment("1999-12-01", 'YYYY/MM/DD'),
          	rules: [
              {
              	type: "object",
                required: true,
                message: "Please input your Date!"
              }
            ]
          })(<DatePicker/>)}
        </Form.Item>
          <Form.Item label="Time: ">
          {getFieldDecorator('TimePicker', {
              initialValue: appointment.Time ? moment(appointment.Time, 'hh:mm:ss') : moment("00-00-00", 'hh:mm:ss'),
          	rules: [
              {
              	type: "object",
                required: true,
                message: "Please input your Time!"
              }
            ]
          })(<TimePicker/>)}
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
               <Icon type="left" />
            Back
          </Button>
        </Form.Item>
      </Form>
              <StreetCardFooter/>
          </div>
    );
  }
}

const WrappedEditAppointment = Form.create({ name: 'time_related_controls' })(EditAppointment);


export default WrappedEditAppointment;

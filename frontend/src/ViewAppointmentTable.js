import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import {Form, Button, Table, Divider} from 'antd';
import Header from './HeaderCommon.js'
import StreetCardFooter from './StreetCardFooter'
import WrappedSetAppointments from "./SetAppointments";


class ViewAppointmentsTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      columns : [
             {
                title: 'Appointment-ID',
                dataIndex: 'appointmentId',
                key: 'appointmentId',
              },
              {
                title: 'Venue',
                dataIndex: 'venue',
                key: 'venue',
              },
              {
                title: 'Service Provider',
                dataIndex: 'serviceProvider',
                key: 'serviceProvider',
              },
              {
                title: 'Date',
                dataIndex: 'Date',
                key: 'Date',
              },
              {
                title: 'Time',
                dataIndex: 'Time',
                key: 'Time',
              },
              {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                  <span>
                    <a>Edit</a>
                  </span>
                ),
              },
            ],
        appointmentData : [
           {
                appointmentId: '',
                venue: '',
                Time: '',
                Date: '',
                serviceProvider: '',
                personalId: '',
          }
        ]

    }
  }


  componentDidMount() {
    fetch('http://127.0.0.1:8000/homeless/' + 4808684002 + '/appointment/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
    })
        .then(res => res.json())
        .then(json => {
          this.setState({
                isLoaded: true,
                appointmentData: json,
              }
          )
        })
    console.log(this.appointmentData);

  }



render(){
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
                offset: 4
              }
            }


          };
          if(this.state.isLoaded== true){
            return(
              <div>
                <Header/>
                <Form {...formItemLayout} className="view-appointment">
                  <Form.Item >
                      <center><h1>Appointment Details</h1></center>
                  </Form.Item>
                  <Form.Item {...tailFormItemLayout}>
                     <Table dataSource={this.state.appointmentData} columns={this.state.columns}/>
                    </Form.Item>
                </Form>
                <StreetCardFooter/>
              </div>
            );
          }
          else{
            return(
              <div>
                <Header/>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}className="view-appointment">
                  <Form.Item>
                      <center><h1>Appointment Details</h1></center>
                  </Form.Item>
                  <Form.Item {...tailFormItemLayout}>

                        <center><h1>Table is not loaded, please click refresh button </h1></center>

                    </Form.Item>
                </Form>
                <StreetCardFooter/>
              </div>
          );
          }

    }
}


const WrappedViewAppointmentsTable = Form.create({ name: 'time_related_controls' })(ViewAppointmentsTable);


export default WrappedViewAppointmentsTable;

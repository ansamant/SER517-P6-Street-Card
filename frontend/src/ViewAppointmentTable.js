import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import {Form, Button, Table, Divider, Card, Layout, Menu} from 'antd';
import Header from './Header'
import StreetCardFooter from './StreetCardFooter'
import WrappedSetAppointments from "./SetAppointments";

const { Content, Sider } = Layout;

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
                width: 180,
                fixed: 'left',
              },
              {
                title: 'Office',
                dataIndex: 'office',
                key: 'office',
                width: 100,
                fixed: 'left',
              },
              {
                title: 'Address',
                dataIndex: 'streetAddress1',
                key: 'streetAddress1',
                width: 100,
              },
              {
                title: 'Address2',
                dataIndex: 'streetAddress2',
                key: 'streetAddress2',
                width: 100,
              },
              {
                title: 'City',
                dataIndex: 'city',
                key: 'city',
                width: 80,
              },
              {
                title: 'Zip Code',
                dataIndex: 'zipCode',
                key: 'zipCode',
                width: 80,
              },
              {
                title: 'State',
                dataIndex: 'state',
                key: 'state',
                width: 80,
              },
              {
                title: 'Service Provider',
                dataIndex: 'serviceProvider',
                key: 'serviceProvider',
                width: 100,
                fixed: 'left',
              },
              {
                title: 'Date',
                dataIndex: 'Date',
                key: 'Date',
                width: 100,
              },
              {
                title: 'Time',
                dataIndex: 'Time',
                key: 'Time',
                width: 100,
              },
              {
                title: 'Action',
                key: 'action',
                fixed: 'right',
                width: 80,
                render: (text, record) => (
                  <span>
                    <Button onClick={() => this.editAppointment(record)} type="primary" htmlType="submit" className="edit-appointment-button">
                    Edit
                  </Button>
                  </span>
                ),
              },
            ],
        appointmentData : [
           {
                appointmentId: '',
                office: '',
                streetAddress1: '',
                streetAddress2: '',
                city: '',
                zipCode: '',
                state: '',
                Time: '',
                Date: '',
                serviceProvider: '',
                personalId: '',
          }
        ]

    }

    this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);

  }


  componentDidMount() {
    fetch('http://127.0.0.1:8000/homeless/' + this.props.homelessPersonId + '/appointment/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
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


  handleSuccessfulLogoutAction() {
    this.props.handleLogout();
    this.props.history.push('/login');
  }


  editAppointment(record) {
    console.log(record.appointmentId)
    this.props.updateAppointmentId(record.appointmentId);
    this.props.history.push('/editAppointment');
  }

   handleClick = e => {
    if(e.key === '3'){
      this.props.updatePageComponent('newAppointMent')
      this.props.history.push('/socialWorkerRegister');
    }else if(e.key === '4'){
      this.props.updatePageComponent('viewAppointment')
      this.props.history.push('/socialWorkerRegister');
    }else if(e.key === '1'){
      this.props.updatePageComponent('registerClient')
      this.props.history.push('/socialWorkerRegister');
    }else if(e.key === '2'){
      this.props.updatePageComponent('updateInformation')
      this.props.history.push('/socialWorkerRegister');
    }else if(e.key === '5'){
      this.props.updatePageComponent('loginfo')
      this.props.history.push('/socialWorkerRegister');
    }
  };

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
          return(
              <Layout className="layout">
                <Header 
                  handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                  loggedInStatus={this.props.loggedInStatus}
                />
                
                <Layout>
                  <Sider className="site-layout-sider"
                >
                  <Menu 
                    style={{ borderRight : '0px', backgroundColor: '#173e43' }} 
                    mode="inline" defaultSelectedKeys={['4']}
                    onClick={this.handleClick}
                  >
                    <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="1">
                      <span>Register Client</span>
                    </Menu.Item>
                    <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="2">
                      <span>Update Client Information</span>
                    </Menu.Item>
                    <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="3">
                      <span>Schedule Appointment</span>
                    </Menu.Item>
                    <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="4">
                      <span>View Appointment</span>
                    </Menu.Item>
                    <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="5">
                      <span>View Logs</span>
                    </Menu.Item>
                  </Menu>
                </Sider>
                  <Content className="content">
                  <div >
                  <Table className="site-layout-content-viewappointment" dataSource={this.state.appointmentData} columns={this.state.columns} scroll={{ x: 1500, y: 300 }}/>
                  </div>
                  </Content>
                </Layout>
                <StreetCardFooter/>
              </Layout>
            );

    }
}


const WrappedViewAppointmentsTable = Form.create({ name: 'time_related_controls' })(ViewAppointmentsTable);


export default WrappedViewAppointmentsTable;

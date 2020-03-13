import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import {Form, Button, Table, Layout,Menu} from 'antd';
import Header from './Header.js'
import StreetCardFooter from './StreetCardFooter'
import { withRouter } from 'react-router-dom';
/**
 * Creating a table for rendering the timestamp logo.
 * Table should display info based on what is known about the user
 */

 //dataSource will come based on 
 const { Content, Sider } = Layout;
class LogView extends React.Component{
  constructor(props){
      super(props);
      console.log('Props')
      console.log(this.props)
      this.state ={
        isLoaded: false,
        columns : [
          {
            title: 'DateTime',
            dataIndex: 'datetime',
          },
          {
            title: 'Personal ID',
            dataIndex: 'personalId',
          },
          {
            title: 'Service Provider',
            dataIndex: 'serviceProvider',
          },
         ],
         dataSource : [
           {
             id: '',
            datetime : '',
            serviceProvider : '',
            personalId: '',
          }
        ]

      }

      this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);
  }

  componentDidMount () {
    fetch('http://127.0.0.1:8000/homeless/' + this.props.handleHomelessPersonId +'/logs/',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
     .then(res => res.json())
     .then(json => {
         console.log(json)
         this.setState({
             isLoaded: true,
             dataSource: json,
             }
         )
     })
  console.log(this.items);
}


handleSuccessfulLogoutAction() {
    this.props.handleLogout();
    this.props.history.push('/login');
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
                    mode="inline" defaultSelectedKeys={['5']}
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
                  <Table className="site-layout-content-viewappointment" dataSource={this.state.dataSource} columns={this.state.columns}/>
                  </div>
                  </Content>
                </Layout>
                <StreetCardFooter/>
              </Layout>
            );
          
    }
}

const WrappedLogTable = Form.create({ name: "log" })(
    LogView
  );
  
  export default WrappedLogTable;
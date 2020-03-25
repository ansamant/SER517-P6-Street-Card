import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import {Form, Button, Table, Layout,Menu} from 'antd';
import Header from './Header.js'
import StreetCardFooter from './StreetCardFooter'
import { withRouter } from 'react-router-dom';
import {FormOutlined, UserOutlined} from "@ant-design/icons";
import CalendarOutlined from "@ant-design/icons/lib/icons/CalendarOutlined";
import ClockCircleOutlined from "@ant-design/icons/lib/icons/ClockCircleOutlined";
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
            title:'Client Name',
            dataIndex: 'clientName',
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
            clientName: '',
            serviceProvider : '',
            personalId: '',
            
          }
        ]

      }

      this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);
  }

  componentDidMount () {
    console.log(this.props.handleHomelessPersonId)
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
    }else if (e.key === '6') {
        this.setState({pageComponent: 'projectenroll'})
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
                 <Sider className="site-layout-sider" breakpoint="lg"
                           collapsedWidth="0"
                           onBreakpoint={broken => {
                               console.log(broken);
                           }}
                           onCollapse={(collapsed, type) => {
                               console.log(collapsed, type);
                           }}>
                        <div className="menu">
                            <Menu mode="inline" theme="dark"
                                  defaultSelectedKeys={['1']}
                                  onClick={this.handleClick}>
                                <Menu.Item className="menuKey" key="1">
                                    <span className="nav-text">
                                        <UserOutlined/>
                                        Client Enrollment</span>
                                </Menu.Item>
                                <Menu.Item className="menuKey" key="2">
                                    <span className="nav-text">
                                        <UserOutlined/>
                                        Update Client Info</span>
                                </Menu.Item>
                                <Menu.Item className="menuKey" key="3">
                                    <span className="nav-text">
                                        <CalendarOutlined/>
                                        Schedule Appointment</span>
                                </Menu.Item>
                                <Menu.Item className="menuKey" key="4">
                                    <span className="nav-text">
                                        <CalendarOutlined/>
                                        View Appointment</span>
                                </Menu.Item>
                                <Menu.Item className="menuKey" key="5">
                                    <span className="nav-text">
                                        <ClockCircleOutlined/>
                                        View Logs</span>
                                </Menu.Item>
                                <Menu.Item className="menuKey" key="6">
                                    <span className="nav-text">
                                        <FormOutlined/>
                                        Project Enrollment</span>
                                </Menu.Item>
                                <Menu.Item className="menuKey" key="7">
                                    <span className="nav-text">
                                        <FormOutlined/>
                                        View Enrollment</span>
                                </Menu.Item>
                            </Menu>
                        </div>
                    </Sider>
                  <Content className="content-enroll">
                  <div >
                  <Table className="site-layout-content-viewappointment" dataSource={this.state.dataSource} columns={this.state.columns} scroll={{ x: 1500, y: 500 }}/>
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
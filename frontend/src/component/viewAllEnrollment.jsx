import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import {Button, Form, Layout, Menu, Table} from 'antd';
import Header from '../Header'
import StreetCardFooter from '../StreetCardFooter'

const {Content, Sider} = Layout;

class ViewAllEnrollment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            columns: [
                {
                    title: 'Enrollment Id',
                    dataIndex: 'EnrollmentID',
                    key: 'EnrollmentID',
                },
                {
                    title: 'Personal Id',
                    dataIndex: 'PersonalId',
                    key: 'PersonalId',
                },
                {
                    title: 'Project Category',
                    dataIndex: 'ProjectCategory',
                    key: 'ProjectCategory',
                }, {
                    title: 'Action',
                    key: 'action',
                    render: (text, record) => (
                        <span>
                    <Button onClick={() => this.viewEnrollmentDetails(record)} type="primary" htmlType="submit"
                            className="registration-submit-button">
                    View Details
                  </Button>
                  </span>
                    ),
                },
            ],
            enrollmentData: [
                {
                    EnrollmentId: '',
                    ProjectCategory: '',
                }
            ]

        }

        this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);

    }

    viewEnrollmentDetails(record) {
        console.log(record.EnrollmentID);
        this.props.inputEnrollmentId(record.EnrollmentID);
        this.props.history.push('/viewEnrollmentDetails');
    }

    componentDidMount() {
        fetch('http://127.0.0.1:8000/homeless/' + this.props.homelessPersonId + '/enrollment/', {
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
                        enrollmentData: json,
                    }
                )
            })

    }


    handleSuccessfulLogoutAction() {
        this.props.handleLogout();
        this.props.history.push('/login');
    }


    handleClick = e => {
        if (e.key === '7') {
            this.props.updatePageComponent('newAppointMent')
            this.props.history.push('/socialWorkerRegister');
        } else if (e.key === '4') {
            this.props.updatePageComponent('viewAppointment')
            this.props.history.push('/socialWorkerRegister');
        } else if (e.key === '1') {
            this.props.updatePageComponent('registerClient')
            this.props.history.push('/socialWorkerRegister');
        } else if (e.key === '2') {
            this.props.updatePageComponent('updateInformation')
            this.props.history.push('/socialWorkerRegister');
        } else if (e.key === '5') {
            this.props.updatePageComponent('loginfo')
            this.props.history.push('/socialWorkerRegister');
        } else if (e.key === '6') {
            this.props.updatePageComponent('projectenroll')
            this.props.history.push('/enrollment');
        } else if (e.key === '7') {
            this.props.updatePageComponent('viewenrollment')
            this.props.history.push('/viewAllEnrollment');
        }
    };

    render() {
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16}
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
        return (
            <Layout className="layout">
                <Header
                    handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                    loggedInStatus={this.props.loggedInStatus}
                />

                <Layout>
                    <Sider className="site-layout-sider"
                    >
                        <Menu
                            style={{borderRight: '0px', backgroundColor: '#173e43'}}
                            mode="inline" defaultSelectedKeys={['7']}
                            onClick={this.handleClick}
                        >
                            <Menu.Item style={{marginTop: '20px', color: '#fae596'}} key="1">
                                <span>Register Client</span>
                            </Menu.Item>
                            <Menu.Item style={{marginTop: '20px', color: '#fae596'}} key="2">
                                <span>Update Client Information</span>
                            </Menu.Item>
                            <Menu.Item style={{marginTop: '20px', color: '#fae596'}} key="3">
                                <span>Schedule Appointment</span>
                            </Menu.Item>
                            <Menu.Item style={{marginTop: '20px', color: '#fae596'}} key="4">
                                <span>View Appointment</span>
                            </Menu.Item>
                            <Menu.Item style={{marginTop: '20px', color: '#fae596'}} key="5">
                                <span>View Logs</span>
                            </Menu.Item>
                            <Menu.Item style={{marginTop: '20px', color: '#fae596'}} key="6">
                                <span>Project Enrollment</span>
                            </Menu.Item>
                            <Menu.Item style={{marginTop: '20px', color: '#fae596'}} key="7">
                                <span>View Enrollment</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content className="content">
                        <div>
                            <Table className="site-layout-content-viewappointment"
                                   dataSource={this.state.enrollmentData} columns={this.state.columns}/>
                        </div>
                    </Content>
                </Layout>
                <StreetCardFooter/>
            </Layout>
        );

    }
}


const WrappedViewAllEnrollment = Form.create({name: 'time_related_controls'})(ViewAllEnrollment);


export default WrappedViewAllEnrollment;

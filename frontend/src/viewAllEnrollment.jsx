import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {Button, Form, Layout, Spin, Table} from 'antd';
import Header from './Header'
import StreetCardFooter from './StreetCardFooter'
import SiderComponent from './SiderComponent'

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
                    fixed: 'right',
                    width: 80,
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
        this.setPagecomponent = this.setPagecomponent.bind(this);

    }

    viewEnrollmentDetails(record) {

        this.props.inputEnrollmentId(record.EnrollmentID);
        this.props.history.push('/viewEnrollmentDetails');
    }

    waitComponent() {
        fetch(process.env.REACT_APP_IP + 'homeless/' + this.props.homelessPersonId + '/enrollment/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(res => {
                if (res.status == 200) {
                    res.json().then(json => {
                        this.setState({
                                isLoaded: true,
                                enrollmentData: json,
                            }
                        )
                    })
                } else if (Math.round(res.status / 100) == 4) {
                    if (window.confirm("Error, invalid personal id: " + (res.status).toString())) {
                        this.props.history.push('/socialWorkerRegister');
                    } else {
                        this.props.history.push('/socialWorkerRegister');
                    }
                } else if (Math.round(res.status / 100) == 5) {
                    if (window.confirm("Server Error: " + (res.status).toString())) {
                        this.props.history.push('/socialWorkerRegister');
                    } else {
                        this.props.history.push('/socialWorkerRegister');
                    }
                }
            })
    }

    componentDidMount() {
        setTimeout(this.waitComponent(), 3000);

    }


    handleSuccessfulLogoutAction() {
        this.props.handleLogout();
        this.props.history.push('/login');
    }


    setPagecomponent(pageComponentValue) {
        this.props.updatePageComponent(pageComponentValue)
        this.props.history.push('/socialWorkerRegister');
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

        if (this.state.isLoaded) {
            return (
                <Layout className="layout">
                    <Header
                        handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                        loggedInStatus={this.props.loggedInStatus}/>

                    <Layout>
                        <SiderComponent
                            setPagecomponent={this.setPagecomponent}
                        />
                        <Content className="content-enroll">
                            <div>
                                <Table className="site-layout-content-viewappointment"
                                       dataSource={this.state.enrollmentData} columns={this.state.columns}
                                       scroll={{x: 1500, y: 500}}/>
                            </div>
                        </Content>
                    </Layout>
                    <StreetCardFooter/>
                </Layout>
            );
        } else {
            return (
                <Layout className="layout">
                    <Header
                        handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                        loggedInStatus={this.props.loggedInStatus}
                    />
                    <Layout>
                        <SiderComponent
                            setPagecomponent={this.setPagecomponent}
                        />
                        <Content className="content-login">
                            <div className="site-layout-content-login">
                                <span>Loading . . .<Spin size="small"/></span>
                            </div>
                        </Content>
                    </Layout>
                    <StreetCardFooter/>
                </Layout>
            );
        }
    }
}


const WrappedViewAllEnrollment = Form.create({name: 'time_related_controls'})(ViewAllEnrollment);


export default WrappedViewAllEnrollment;

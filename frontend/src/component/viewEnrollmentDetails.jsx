import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import {Collapse, Form, Layout, Menu} from "antd";
import Header from '../Header'
import StreetCardFooter from '../StreetCardFooter'
import {FormOutlined, UserOutlined} from "@ant-design/icons";
import CalendarOutlined from "@ant-design/icons/lib/icons/CalendarOutlined";
import ClockCircleOutlined from "@ant-design/icons/lib/icons/ClockCircleOutlined";

const {Content, Sider} = Layout;
const {Panel} = Collapse;

class ViewEnrollmentDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enrollment: {},
            isLoaded: false,
        }
        this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);

    }

    componentDidMount() {
        fetch('http://127.0.0.1:8000/homeless/' + this.props.homelessPersonId + '/enrollment/' + this.props.enrollmentId + '/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                // json = this.modifyJSON(json)
                this.setState({
                        enrollment: json,
                    }
                )

            })
    }

    handleSuccessfulLogoutAction() {
        this.props.handleLogout();
        this.props.history.push('/login');
    }

    handleClick = e => {
        if (e.key === '3') {
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
        const {enrollment} = this.state;
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const config = {
            rules: [{type: 'object', required: true, message: 'Please select time!'}],
        };

        const enrollMainDetails = []
        const enrollPanel = []

        for (const key in enrollment) {
            if (typeof (enrollment[key]) === 'object') {
                const eVal = []
                for (const x in enrollment[key]) {
                    eVal.push(<p>{x} : {enrollment[key][x]}</p>);
                }
                enrollPanel.push(<Panel header={key} key={key}>{eVal}</Panel>)
            } else {
                enrollMainDetails.push(<p> {key} : {enrollment[key]} </p>)
            }

        }


        return (
            <Layout className="layout">
                <Header
                    handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                    loggedInStatus={this.props.loggedInStatus}/>
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
                                  defaultSelectedKeys={['7']}
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
                        <div className="site-layout-content-homeless">
                            <Form {...formItemLayout} name="enrollment">
                                <Collapse accordion style={{backgroundColor: "#f0f9ff"}}>
                                    <Panel key="1" header="Enrollment Details">
                                        {enrollMainDetails}
                                    </Panel>
                                    {enrollPanel}
                                </Collapse>
                            </Form>
                        </div>
                    </Content>
                </Layout>
                <StreetCardFooter/>
            </Layout>
        );
    }
}

const WrappedViewEnrollmentDetails = Form.create({name: 'time_related_controls'})(ViewEnrollmentDetails);


export default WrappedViewEnrollmentDetails;
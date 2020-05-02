import React from 'react'
import {Layout, Menu} from "antd";
import {FormOutlined, UserOutlined} from "@ant-design/icons";
import CalendarOutlined from "@ant-design/icons/lib/icons/CalendarOutlined";
import ClockCircleOutlined from "@ant-design/icons/lib/icons/ClockCircleOutlined";


const {Content, Sider} = Layout;

export default class SiderComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedKey: 0,
        }
    }

    handleClick = e => {

        switch (e.key) {
            case '1':
                this.props.setPagecomponent('registerClient')
                this.setState({
                    selectedKey: 1
                })
                break;
            case '2':
                this.props.setPagecomponent('updateInformation')
                this.setState({
                    selectedKey: 2
                })
                break;
            case '3':
                this.props.setPagecomponent('newAppointMent')
                this.setState({
                    selectedKey: 3
                })
                break;
            case '4':
                this.props.setPagecomponent('viewAppointment')
                this.setState({
                    selectedKey: 4
                })
                break;
            case '5':
                this.props.setPagecomponent('loginfo')
                this.setState({
                    selectedKey: 5
                })
                break;
            case '6':
                this.props.setPagecomponent('projectenroll')
                this.setState({
                    selectedKey: 6
                })
                break;
            case '7':
                this.props.setPagecomponent('viewenrollment')
                this.setState({
                    selectedKey: 7
                })
                break;
        }
    };


    render() {
        return (
            <Sider className="site-layout-sider" breakpoint="lg"
                   collapsedWidth="0"
                   onBreakpoint={broken => {

                   }}
                   onCollapse={(collapsed, type) => {

                   }}>
                <div className="menu">s
                    <Menu mode="inline" theme="dark"
                          defaultSelectedKeys={"'" + this.state.selectedKey + "'"}
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
                        <Menu.Item className="menuKey" key="4">s
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
        );
    }
}
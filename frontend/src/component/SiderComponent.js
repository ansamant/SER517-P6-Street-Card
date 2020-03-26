import React from 'react'
import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Collapse,
    DatePicker,
    Form,
    Icon,
    Input,
    Layout,
    Menu,
    Row,
    Select
} from "antd";
import {FormOutlined, UserOutlined} from "@ant-design/icons";
import CalendarOutlined from "@ant-design/icons/lib/icons/CalendarOutlined";
import ClockCircleOutlined from "@ant-design/icons/lib/icons/ClockCircleOutlined";


const {Content, Sider} = Layout;

export default class SiderComponent extends React.Component {

    constructor(props) {
        super(props);
    }

	 handleClick = e => {
        
        switch(e.key){
            case '1':
                this.props.setPagecomponent('registerClient')
                break;
            case '2':
                this.props.setPagecomponent('updateInformation')
                break;
            case '3':
                this.props.setPagecomponent('newAppointMent')
                break;
            case '4':
                this.props.setPagecomponent('viewAppointment')
                break;
            case '5':
                this.props.setPagecomponent('loginfo')
                break;
            case '6':
                this.props.setPagecomponent('projectenroll')
                break;
            case '7':
                this.props.setPagecomponent('viewenrollment')
                break;
        }
    };

    

	render(){
		return(
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
                                          defaultSelectedKeys={'1'}
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
		);
	}
}
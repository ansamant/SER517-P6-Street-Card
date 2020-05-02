import React from 'react'
import {Layout, Menu} from "antd";
import {FormOutlined, UserOutlined} from "@ant-design/icons";
import CalendarOutlined from "@ant-design/icons/lib/icons/CalendarOutlined";
import ClockCircleOutlined from "@ant-design/icons/lib/icons/ClockCircleOutlined";


const {Content, Sider} = Layout;

export default class SiderComponentSocialWorker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedKey: 1,
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
                this.props.setPagecomponent('updateSocialWorkerInfo')
                this.setState({
                    selectedKey: 2
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
                                        Register Social Worker</span>
                        </Menu.Item>
                        <Menu.Item className="menuKey" key="2">
                                    <span className="nav-text">
                                        <UserOutlined/>
                                        Update Password</span>
                        </Menu.Item>
                    </Menu>
                </div>
            </Sider>
        );
    }
}
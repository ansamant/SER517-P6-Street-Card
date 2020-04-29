import React from 'react'
import {Layout, Menu} from "antd";
import {FormOutlined, UserOutlined, SettingOutlined} from "@ant-design/icons";
import CalendarOutlined from "@ant-design/icons/lib/icons/CalendarOutlined";
import ClockCircleOutlined from "@ant-design/icons/lib/icons/ClockCircleOutlined";


const {Content, Sider} = Layout;

export default class SiderComponentServiceProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedKey: 1,
        }
    }

    handleClick = e => {

        switch (e.key) {
            case '1':
                this.props.setPagecomponent('inventoryLog')
                this.setState({
                    selectedKey: 1
                })
                break;
            case '2':
                this.props.setPagecomponent('pieChart')
                this.setState({
                    selectedKey: 2
                })
                break;
            case '3':
                this.props.setPagecomponent('donutChart')
                this.setState({
                    selectedKey: 3
                })
                break;
            case '4':
                this.props.setPagecomponent('barChart')
                this.setState({
                    selectedKey: 4
                })
                break;
            case '5':
                this.props.setPagecomponent('lineChart')
                this.setState({
                    selectedKey: 5
                })
                break;
            case '6':
                this.props.setPagecomponent('combinedChart')
                this.setState({
                    selectedKey: 6
                })
                break;
             case '7':
                this.props.setPagecomponent('addProduct')
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
                                        Inventory Log</span>
                        </Menu.Item>
                        <Menu.Item className="menuKey" key="2">
                                    <span className="nav-text">
                                        <UserOutlined/>
                                        Product Unit Data</span>
                        </Menu.Item>
                        <Menu.Item className="menuKey" key="3">
                                    <span className="nav-text">
                                        <CalendarOutlined/>
                                        Product Cost Data</span>
                        </Menu.Item>
                        <Menu.Item className="menuKey" key="4">
                            <span className="nav-text">
                                        <CalendarOutlined/>
                                        Product Data</span>
                        </Menu.Item>
                        <Menu.Item className="menuKey" key="7">
                                    <span className="nav-text">
                                        <SettingOutlined/>
                                        Add Product</span>
                        </Menu.Item>
                    </Menu>
                </div>
            </Sider>
        );
    }
}

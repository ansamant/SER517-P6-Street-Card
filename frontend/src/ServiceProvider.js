import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {Button, Form, Icon, Input, Layout, Row, Col, Table} from "antd";
import Header from './Header'
import StreetCardFooter from './StreetCardFooter'
import SiderComponentServiceProvider from './component/SiderComponentServiceProvider'
import { Chart } from "react-google-charts";

const {Content} = Layout;

class ServiceProviderView extends React.Component {

    constructor(props) {
        super(props);

       
        this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);
        this.setPagecomponent = this.setPagecomponent.bind(this);
    }

    state = {
        pageComponent: this.props.pageComponent,
        productUnitData: [],
        productCostData:[],
        productData:[]
    };
    

    handleSuccessfulLogoutAction() {
        this.props.handleLogout();
        this.props.history.push('/login');
    }

    

    render() {
        const {getFieldDecorator} = this.props.form;

        if (this.state.pageComponent == 'inventoryLog') {
            return (
            <Layout className="layout">
                        <Header
                            handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                            loggedInStatus={this.state.loggedInStatus}
                        />
                        <Layout>

                            <SiderComponentServiceProvider
                                setPagecomponent={this.setPagecomponent}
                            />
                            <Content className="content-login">
                                <div className="site-layout-content-login">
                                    <Form onSubmit={this.handleHomelessIdSubmit.bind(this)}>
                                        <Form.Item>
                                            {getFieldDecorator('personId', {
                                                rules: [{
                                                    required: true,
                                                    message: " Please input Client's Personal Identification !"
                                                }],
                                            })(
                                                <Input
                                                    prefix={<Icon type="user" style={{
                                                        color: 'rgba(0,0,0,.25)',
                                                        fontSize: "12px"
                                                    }}/>}
                                                    placeholder="Client's Personal Identification"
                                                />,
                                            )}
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" className="login-form-button">
                                                Continue
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </Content>
                        </Layout>
                        <StreetCardFooter/>
                    </Layout>
            ); 
        }else if(this.state.pageComponent == 'pieChart'){
            return(
                <div>
                <Layout className="layout">
            <Header handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                    loggedInStatus={this.state.loggedInStatus}
            />
            <Layout>
                <SiderComponentServiceProvider
                    setPagecomponent={this.setPagecomponent}
                />
                <Content className="content-login">
                        <Chart
                          className = "site-layout-content-graphs"
                          chartType="PieChart"
                          loader={<div>Loading Chart</div>}
                          data={this.state.productUnitData}
                          options={{
                            title: 'Product Available Units',
                            is3D: true,
                          }}
                          rootProps={{ 'data-testid': '2' }}
                        />
                </Content>
            </Layout>
            <StreetCardFooter/>
            </Layout>
                </div>
            );
        }else {
            return(
            <Layout className="layout">
                        <Header
                            handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                            loggedInStatus={this.state.loggedInStatus}
                        />
                        <Layout>

                            <SiderComponentServiceProvider
                                setPagecomponent={this.setPagecomponent}
                            />
                            <Content className="content-login">
                                <div className="site-layout-content-login">
                                    <Form onSubmit={this.handleHomelessIdSubmit.bind(this)}>
                                        <Form.Item>
                                            {getFieldDecorator('personId', {
                                                rules: [{
                                                    required: true,
                                                    message: " Please input Client's Personal Identification !"
                                                }],
                                            })(
                                                <Input
                                                    prefix={<Icon type="user" style={{
                                                        color: 'rgba(0,0,0,.25)',
                                                        fontSize: "12px"
                                                    }}/>}
                                                    placeholder="Client's Personal Identification"
                                                />,
                                            )}
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" className="login-form-button">
                                                Continue
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </Content>
                        </Layout>
                        <StreetCardFooter/>
                    </Layout>
            );
        }
       
    }
}


//ReactDOM.render(<Greeter/>, document.getElementById('greeter'));

const WrappedServiceProvider = Form.create({name: "serviceProvider"})(
    ServiceProviderView
);

export default WrappedServiceProvider;
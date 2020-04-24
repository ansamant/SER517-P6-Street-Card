import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {Form, Layout, Table} from 'antd';
import Header from './Header.js'
import StreetCardFooter from './StreetCardFooter'
import SiderComponentServiceProvider from './SiderComponentServiceProvider'

/**
 * Creating a table for rendering the timestamp logo.
 * Table should display info based on what is known about the user
 */

const {Content} = Layout;

class InventoryLog extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.homelessInventoryData)
        this.state = {
            isLoaded: false,
            columns: [
                {
                    title: 'Date',
                    dataIndex: 'dateTime',
                },
                {
                    title: 'Transaction ID',
                    dataIndex: 'transactionId',
                },
                {
                    title: 'Total Amount',
                    dataIndex: 'totalAmount',
                },

                {
                    title: 'Unit Purchased',
                    dataIndex: 'unitPurchased',
                },

                {
                    title: 'Product ID',
                    dataIndex: 'productId',
                },

            ],
            dataSource: [
                {
                    transactionId: '',
                    totalAmount: '',
                    unitPurchased: '',
                    productId: '',
                    dateTIme:''

                }
            ]

        }

        this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);
        this.setPagecomponent = this.setPagecomponent.bind(this);
    }

    componentDidMount() {
        
    }


    handleSuccessfulLogoutAction() {
        this.props.handleLogout();
        this.props.history.push('/login');
    }


    setPagecomponent(pageComponentValue) {
        this.props.updatePageComponent(pageComponentValue)
        this.props.history.push('/serviceProvider');
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
                    <SiderComponentServiceProvider
                        setPagecomponent={this.setPagecomponent}
                    />
                    <Content className="content-enroll">
                        <div>
                            <Table className="site-layout-content-viewappointment" dataSource={this.state.dataSource}
                                   columns={this.state.columns} scroll={{x: 1500, y: 500}}/>
                        </div>
                    </Content>
                </Layout>
                <StreetCardFooter/>
            </Layout>
        );

    }
}

const WrappedLogTable = Form.create({name: "log"})(
    InventoryLog
);

export default WrappedLogTable;
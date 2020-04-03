import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {Button, Form, Layout, Table} from "antd";
import Header from './Header'
import StreetCardFooter from './StreetCardFooter'
import SiderComponent from './component/SiderComponent';

const {Content} = Layout;

class Transaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            columns: [
                {
                    title: 'productId',
                    dataIndex: 'productId',
                    key: 'productId',
                    width: 80,
                },
                {
                    title: 'productName',
                    dataIndex: 'productName',
                    key: 'productName',
                    width: 30,
                },
                {
                    title: 'costPerItem',
                    dataIndex: 'costPerItem',
                    key: 'costPerItem',
                    width: 30,
                },
                {
                    title: 'unitsAvailable',
                    dataIndex: 'unitsAvailable',
                    key: 'unitsAvailable',
                    width: 30,
                },
                {
                    title: 'serviceProvider',
                    dataIndex: 'serviceProvider',
                    key: 'serviceProvider',
                    width: 30,
                },
            ],
            productData: [
                {
                    productId: '',
                    productName: '',
                    costPerItem: '',
                    unitsAvailable: '',
                    serviceProvider: '',
                }
            ]
        }
        this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);
        this.setPagecomponent = this.setPagecomponent.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:8000/product/', {
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
                        productData: json,
                    }
                )
            })
        console.log(this.productData);
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
        console.log(this.props.homelessPersonId)
        return (
            <Layout className="layout">
                <Header
                    handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                    loggedInStatus={this.props.loggedInStatus}/>
                <Layout>
                    <Content className="content-enroll">
                        <div className="site-layout-content-homeless">
                            <Table className="site-layout-content-viewappointment"
                                   dataSource={this.state.productData} columns={this.state.columns}/>
                        </div>
                    </Content>
                </Layout>
                <StreetCardFooter/>
            </Layout>
        );
    }
}

const WrappedTransaction = Form.create({name: 'time_related_controls'})(Transaction);


export default WrappedTransaction;

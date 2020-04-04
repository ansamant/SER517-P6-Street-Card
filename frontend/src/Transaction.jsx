import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {Button, Form, Layout, Table, InputNumber} from "antd";
import Header from './Header'
import StreetCardFooter from './StreetCardFooter'

const {Content} = Layout;

class Transaction extends React.Component {
    constructor(props) {


        super(props);
        this.state = {
            isLoaded: false,
            selectedRowKeys: [],
            columns: [
                {
                    title: 'Product Id',
                    dataIndex: 'productId',
                    key: 'productId',
                    width: 80,
                },
                {
                    title: 'Product Name',
                    dataIndex: 'productName',
                    key: 'productName',
                    width: 30,
                },
                {
                    title: 'Cost Per Item',
                    dataIndex: 'costPerItem',
                    key: 'costPerItem',
                    width: 30,
                },
                {
                    title: 'Units Available',
                    dataIndex: 'unitsAvailable',
                    key: 'unitsAvailable',
                    width: 30,
                },
                {
                    title: 'Units Given',
                    key: 'action',
                    width: 30,
                    render: () => (
                        <span>
                        <InputNumber min={0} max={100} defaultValue={0}/>
                        </span>
                    ),
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

    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
        this.setState({
        selectedRowKeys: [],
        loading: false,
        });
        }, 1000);
    };

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };


    onChange(value) {
  console.log('changed', value);
}

    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            };
        const hasSelected = selectedRowKeys.length > 0;
        console.log(this.props.homelessPersonId)
        return (
            <Layout className="layout">
                <Header
                    handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                    loggedInStatus={this.props.loggedInStatus}/>
                <Layout>
                    <Content className="content-enroll">
                        <div className="site-layout-content-homeless">
                            <Table rowSelection={rowSelection} className="site-layout-content-viewappointment"
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

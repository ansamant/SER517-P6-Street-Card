import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {Form, Layout, Table} from "antd";
import Header from './Header'
import StreetCardFooter from './StreetCardFooter'
import SiderComponentServiceProvider from './SiderComponentServiceProvider'
import {Chart} from "react-google-charts";
import WrappedAddProduct from './AddProduct';

const {Content} = Layout;

class ServiceProviderView extends React.Component {

    state = {
        productUnitData: [],
        productCostData: [],
        productData: []
    };

    constructor(props) {
        super(props);
        this.state = {
            pageComponent: this.props.pageComponent,
            isLoaded: false,
            columns: [
                {
                    title: 'DateTime',
                    dataIndex: 'datetime',
                },
                {
                    title: 'Personal ID',
                    dataIndex: 'personalId',
                },

                {
                    title: 'Client Name',
                    dataIndex: 'clientName',
                },

                {
                    title: 'Service Provider',
                    dataIndex: 'serviceProvider',
                },

            ],
            dataSource: [
                {
                    id: '',
                    datetime: '',
                    clientName: '',
                    serviceProvider: '',
                    personalId: '',

                }
            ],
            columns_2: [
                {
                    title: 'Product ID',
                    dataIndex: 'productId',
                },
                {
                    title: 'Product',
                    dataIndex: 'productName',
                },
                {
                    title: 'Product cost',
                    dataIndex: 'costPerItem',
                },

                {
                    title: 'Unit Available',
                    dataIndex: 'unitsAvailable',
                },

                {
                    title: 'Service Provider',
                    dataIndex: 'serviceProvider',
                },
                {
                    title: 'Category',
                    dataIndex: 'category',
                }

            ],
            dataSource_2: [
                {
                    productId: '',
                    productName: '',
                    costPerItem: '',
                    unitsAvailable: '',
                    serviceProvider: '',
                    category: ''

                }
            ]

        }

        this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);
        this.setPagecomponent = this.setPagecomponent.bind(this);
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_IP + 'product/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(res => res.json())
            .then(json => {
                var productUnitDataLocal = new Array(json.length + 1);
                productUnitDataLocal[0] = new Array(2);
                productUnitDataLocal[0][0] = 'Product';
                productUnitDataLocal[0][1] = 'Available Units';
                for (var i = 1; i < productUnitDataLocal.length; i++) {
                    productUnitDataLocal[i] = new Array(2);
                    productUnitDataLocal[i][0] = json[i - 1].productName
                    productUnitDataLocal[i][1] = json[i - 1].unitsAvailable
                }

                var productCostDataLocal = new Array(json.length + 1);
                productCostDataLocal[0] = new Array(2);
                productCostDataLocal[0][0] = 'Product';
                productCostDataLocal[0][1] = 'Item Cost';
                for (var i = 1; i < productCostDataLocal.length; i++) {
                    productCostDataLocal[i] = new Array(2);
                    productCostDataLocal[i][0] = json[i - 1].productName
                    productCostDataLocal[i][1] = json[i - 1].costPerItem
                }


                var productDataLocal = new Array(json.length + 1);
                productDataLocal[0] = new Array(4);
                productDataLocal[0][0] = 'Product';
                productDataLocal[0][1] = 'Available Units';
                productDataLocal[0][2] = 'Item Cost';
                productDataLocal[0][3] = 'total cost'
                for (var i = 1; i < productDataLocal.length; i++) {
                    productDataLocal[i] = new Array(4);
                    productDataLocal[i][0] = json[i - 1].productName
                    productDataLocal[i][1] = json[i - 1].unitsAvailable
                    productDataLocal[i][2] = json[i - 1].costPerItem
                    productDataLocal[i][3] = json[i - 1].unitsAvailable * json[i - 1].costPerItem
                }
                this.setState({
                        productUnitData: productUnitDataLocal,
                        productCostData: productCostDataLocal,
                        productData: productDataLocal
                    }
                )

            })

        fetch(process.env.REACT_APP_IP + 'product/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(res => res.json())
            .then(json => {
                this.setState({
                        dataSource_2: json,
                    }
                )
            })
    }


    handleSuccessfulLogoutAction() {
        this.props.handleLogout();
        this.props.history.push('/login');
    }

    setPagecomponent(pageComponentValue) {
        this.setState({
            pageComponent: pageComponentValue
        });
    };

    handleHomelessIdSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {

            if (!err) {
                fetch(process.env.REACT_APP_IP + 'homeless/' + values.personId + '/transaction/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(res => res.json())
                    .then(json => {
                        this.props.handleHomelessPersonInventoryJson(json);
                        this.props.history.push('/inventoryLog');
                    });

            }
        });

    };

    render() {
        const {getFieldDecorator} = this.props.form;

        if (this.state.pageComponent == 'pieChart') {
            return (
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
                                    className="site-layout-content-graphs"
                                    chartType="PieChart"
                                    loader={<div>Loading Chart</div>}
                                    data={this.state.productUnitData}
                                    options={{
                                        title: 'Product Available Units',
                                        is3D: true,
                                    }}
                                    rootProps={{'data-testid': '2'}}
                                />
                            </Content>
                        </Layout>
                        <StreetCardFooter/>
                    </Layout>
                </div>
            );
        } else if (this.state.pageComponent == 'donutChart') {
            return (
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
                                    className="site-layout-content-graphs"
                                    chartType="PieChart"
                                    loader={<div>Loading Chart</div>}
                                    data={this.state.productCostData}
                                    options={{
                                        title: 'Product per Unit Cost',
                                        pieHole: 0.4,
                                    }}
                                    rootProps={{'data-testid': '3'}}
                                />
                            </Content>
                        </Layout>
                        <StreetCardFooter/>
                    </Layout>
                </div>
            );
        } else if (this.state.pageComponent == 'barChart') {
            return (
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
                                    className="site-layout-content-graphs"
                                    chartType="Bar"
                                    loader={<div>Loading Chart</div>}
                                    data={this.state.productData}
                                    options={{
                                        chart: {
                                            title: 'Product Data'
                                        },
                                    }}
                                    // For tests
                                    rootProps={{'data-testid': '2'}}
                                />
                            </Content>
                        </Layout>
                        <StreetCardFooter/>
                    </Layout>
                </div>
            );
        } else if (this.state.pageComponent == 'lineChart') {
            return (
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
                                    className="site-layout-content-graphs"
                                    chartType="Line"
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        [
                                            'Day',
                                            'Guardians of the Galaxy',
                                            'The Avengers',
                                            'Transformers: Age of Extinction',
                                        ],
                                        [1, 37.8, 80.8, 41.8],
                                        [2, 30.9, 69.5, 32.4],
                                        [3, 25.4, 57, 25.7],
                                        [4, 11.7, 18.8, 10.5],
                                        [5, 11.9, 17.6, 10.4],
                                        [6, 8.8, 13.6, 7.7],
                                        [7, 7.6, 12.3, 9.6],
                                        [8, 12.3, 29.2, 10.6],
                                        [9, 16.9, 42.9, 14.8],
                                        [10, 12.8, 30.9, 11.6],
                                        [11, 5.3, 7.9, 4.7],
                                        [12, 6.6, 8.4, 5.2],
                                        [13, 4.8, 6.3, 3.6],
                                        [14, 4.2, 6.2, 3.4],
                                    ]}
                                    options={{
                                        chart: {
                                            title: 'Box Office Earnings in First Two Weeks of Opening',
                                            subtitle: 'in millions of dollars (USD)',
                                        },
                                    }}
                                    rootProps={{'data-testid': '3'}}
                                />
                            </Content>
                        </Layout>
                        <StreetCardFooter/>
                    </Layout>
                </div>
            );
        } else if (this.state.pageComponent == 'combinedChart') {
            return (
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
                                    className="site-layout-content-graphs"
                                    chartType="ComboChart"
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        [
                                            'Month',
                                            'Bolivia',
                                            'Ecuador',
                                            'Madagascar',
                                            'Papua New Guinea',
                                            'Rwanda',
                                            'Average',
                                        ],
                                        ['2004/05', 165, 938, 522, 998, 450, 614.6],
                                        ['2005/06', 135, 1120, 599, 1268, 288, 682],
                                        ['2006/07', 157, 1167, 587, 807, 397, 623],
                                        ['2007/08', 139, 1110, 615, 968, 215, 609.4],
                                        ['2008/09', 136, 691, 629, 1026, 366, 569.6],
                                    ]}
                                    options={{
                                        title: 'Monthly Coffee Production by Country',
                                        vAxis: {title: 'Cups'},
                                        hAxis: {title: 'Month'},
                                        seriesType: 'bars',
                                        series: {5: {type: 'line'}},
                                    }}
                                    rootProps={{'data-testid': '1'}}
                                />
                            </Content>
                        </Layout>
                        <StreetCardFooter/>
                    </Layout>
                </div>
            );
        } else if (this.state.pageComponent == 'addProduct') {
            return (
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
                                <div className="site-layout-content-login">
                                    <WrappedAddProduct history={this.props.history}
                                    />
                                </div>
                            </Content>
                        </Layout>
                        <StreetCardFooter/>
                    </Layout>
                </div>
            );
        } else {
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
                        <Content className="content-enroll">
                            <div>
                                <Table className="site-layout-content-viewappointment"
                                       dataSource={this.state.dataSource_2}
                                       columns={this.state.columns_2} scroll={{x: 1500, y: 500}}/>
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

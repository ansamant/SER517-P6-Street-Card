import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {Button, Form, Layout, Table, InputNumber} from "antd";
import Header from './Header'
import './transaction.css'
import StreetCardFooter from './StreetCardFooter'

const {Content} = Layout;
const header =["Product Id", "Product Name","Cost Per Item", "Units Available","Service Provider","Given Units", "Amount"];

class Transaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            selectedRowKeys: [],
            totalAmount: 0,
            productData: [
                {
                    productId: '',
                    productName: '',
                    costPerItem: '',
                    unitsAvailable: '',
                    serviceProvider: '',
                    quantity: 0,
                    amount: 0,
                    index1: 0
                }
            ]

        }
        this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);
        this.setPagecomponent = this.setPagecomponent.bind(this);
        this.renderTableHeader = this.renderTableHeader.bind(this);
    }

    takeIntput = (e, index) => {

        let prodData = JSON.parse(JSON.stringify(this.state.productData));
        prodData[index].quantity = e.target.value;
        prodData[index].amount = e.target.value * prodData[index].costPerItem;
        this.setState({productData: prodData})
        this.state.totalAmount += prodData[index].amount;
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
                let prod = [];
                json.forEach((key, index) => {
                    key = {
                        ...key, "unitsPurchased": 0,
                        "amount": 0, "index1": index
                    }
                    prod.push(key)

                })
                console.log(prod)
                this.setState({
                        isLoaded: true,
                        productData: prod,
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
        this.props.updatePageComponent(pageComponentValue);
        this.props.history.push('/socialWorkerRegister');
    }

    renderTableHeader() {
        let res = [];
        for (let i = 0; i < header.length; i++) {
            res.push(<th key={header[i]}>{header[i]}</th>)
        }
            return res;
    }

    renderTableData() {
      return this.state.productData.map((product, index) => {
         const { productId, productName, costPerItem, unitsAvailable, serviceProvider, amount, index1} = product //destructuring
         return (
            <tr key={productId}>
               <td align={"center"}>{productId}</td>
               <td align={"center"}>{productName}</td>
               <td align={"center"}>{costPerItem}</td>
               <td align={"center"}>{unitsAvailable}</td>
               <td align={"center"}>{serviceProvider}</td>
               <td><InputNumber min={0} max={100} defaultValue={0} onBlur={(e) => this.takeIntput(e,index1)}/></td>
               <td>{amount}</td>
            </tr>
         )
      })
   }

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
                            <h1 align="center">Inventory Details</h1>
                            <table id='inventory'>
                                <thead>
                                    <tr>{this.renderTableHeader()}</tr>
                                </thead>
                                <tbody >
                                    <tr>{this.renderTableHeader}</tr>
                                    {this.renderTableData()}
                                </tbody>
                            </table>
                            <p align={"center"}>Total Amount : { this.state.totalAmount }</p>
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

import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {Button, Cascader, Form, Input, InputNumber, Layout} from "antd";


const {Content} = Layout;

const category = [
    {
        value: "Shoes",
        label: "Shoes"
    },
    {
        value: "PersonalHygieneItems",
        label: "Personal Hygiene Items"
    },
    {
        value: "MealPass",
        label: "Meal Pass"
    },
    {
        value: "TransportPass",
        label: "Transport Pass"
    },
    {
        value: "Clothing",
        label: "Clothing"
    },
    {
        value: "RainGear",
        label: "Rain Gear"
    },
    {
        value: "PetFood",
        label: "Pet Food"
    }
];

const serviceProvider = [
    {
        value: "FP",
        label: "Food Pantry"
    },
    {
        value: "DIC",
        label: "Drop in Centre"
    },
    {
        value: "SH",
        label: "Shelter Home"
    },
    {
        value: "SK",
        label: "Soup Kitchen"
    }
];

class AddProduct extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,


        }

    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var newProduct = {};
                newProduct.productName = values.productName;
                newProduct.category = values.category[0];
                newProduct.unitsAvailable = values.unitsAvailable;
                newProduct.costPerItem = values.costPerItem;
                newProduct.serviceProvider = values.serviceProvider[0];

                fetch(process.env.REACT_APP_IP + 'product/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(newProduct)
                })
                    .then(res => res.json()).then(json => {
                    this.props.history.push('/productAdditionComplete');
                });
            }

        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Content>
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator("productName", {
                                rules: [
                                    {
                                        message: "Please input the product name!",
                                        required: true,
                                    }
                                ]
                            })(<Input placeholder="Product Name"/>)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator("category", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please select the category of the product!"
                                    }
                                ]
                            })(<Cascader options={category} placeholder="Category"/>)}
                        </Form.Item>
                        <Form.Item style={{width: '30%'}}>
                            {getFieldDecorator("unitsAvailable", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input number of units!"
                                    }
                                ]
                            })(<InputNumber min={1} placeholder="Number of units"/>)}
                        </Form.Item>
                        <Form.Item style={{width: '30%'}}>
                            {getFieldDecorator("costPerItem", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input the price per unit!"
                                    }
                                ]
                            })(<InputNumber min={0.00} step={0.01} placeholder="Cost Per Item"/>)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator("serviceProvider", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please select the your service provider!"
                                    }
                                ]
                            })(<Cascader options={serviceProvider} placeholder="Service Provider"/>)}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        );


    }
}


const WrappedAddProduct = Form.create({name: "addProduct"})(
    AddProduct
);

export default WrappedAddProduct;

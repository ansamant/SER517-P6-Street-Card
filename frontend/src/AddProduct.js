import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {Button, Form, Input, Layout, InputNumber, Cascader} from "antd";


const {Content} = Layout;

const category = [
        {
            value: "footware",
            label: "Foot-ware"
        },
        {
            value: "winterwear",
            label: "Winter-ware"
        },
        {
            value: "meal_pass",
            label: "Meal Pass"
        },
        {
            value: "transport_pass",
            label: "Transport Pass"
        },
        {
            value: "bags",
            label: "Bags"
        },
        {
            value: "quilt",
            label: "Quilt"
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




    render() {
        const {getFieldDecorator} = this.props.form;
        return (
                    <Content>
                        <div>
                            <Form >
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
                                               type: "array",
                                               required: true,
                                               message: "Please select the category of the product!"
                                            }
                                        ]
                                    })(<Cascader options={category} placeholder="Category"/>)}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator("unitsAvailable", {
                                        rules: [
                                            {
                                               required: true,
                                               message: "Please input number of units!"
                                            }
                                        ]
                                    })(<InputNumber min={1} placeholder="Number of units"/>)}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator("serviceProvider", {
                                        rules: [
                                            {
                                               type: "array",
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

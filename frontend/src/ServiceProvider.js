import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {Button, Form, Icon, Input, Layout} from "antd";
import Header from './Header'
import StreetCardFooter from './StreetCardFooter'

const {Content} = Layout;

class ServiceProviderView extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.clearanceLevel);
        console.log(this.props.serviceProvider);
        this.state = {
            isLoaded: false,
            name: "",
            clearanceLevel: this.props.clearanceLevel,
            serviceProvider: this.props.serviceProvider
        }
        this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);
    }


    componentDidMount() {

    }

    // handleSubmit = e => {
    //     e.preventDefault();
    //     this.props.form.validateFieldsAndScroll((err, values) => {

    //         if (!err) {

    //             var registerRequestObject = {};
    //             registerRequestObject.serviceProvider = this.state.serviceProvider;
    //             registerRequestObject.clientName = "";
    //             console.log(registerRequestObject);
    //             fetch('http://localhost:8000/homeless/' + values.personalId + '/', {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     Authorization: `Bearer ${localStorage.getItem('token')}`
    //                 }

    //             })
    //                 .then(res => res.json())
    //                 .then(json => {
    //                     // Need name to be used in the header for easy mapping of client name.
    //                     registerRequestObject.clientName = json['FirstName'] + ' ' + json['LastName']
    //                     console.log("REG1 " + registerRequestObject.clientName)
    //                     this.setState({
    //                         isLoaded: true,
    //                         name: registerRequestObject.clientName,
    //                     })

    //                 }).then(json => {
    //                 //should only run after get request has successfully
    //                 //console.log("REG2 "+ JSON.stringify(registerRequestObject));
    //                 fetch('http://localhost:8000/homeless/' + values.personalId + '/logs/', {
    //                     method: 'POST',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                         Authorization: `Bearer ${localStorage.getItem('token')}`
    //                     },
    //                     body: JSON.stringify(registerRequestObject)
    //                 })
    //                     .then(res => res.json())
    //                     .then(
    //                         json => {
    //                             console.log("register response:", json);
    //                         });
    //             });
    //         }
    //     });
    // };


    handleSuccessfulLogoutAction() {
        this.props.handleLogout();
        this.props.history.push('/login');
    }

    render() {
        // const {items} = this.state;
        const {name} = this.state;
        const {isLoaded} = this.state;
        const {getFieldDecorator} = this.props.form;
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
                    offset: 8
                }
            }
        };
       
        let form;
        form = <Layout className="layout">
            <Header handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                    loggedInStatus={this.state.loggedInStatus}
            />
            <Layout>
                <Content className="content-login">
                    <div className="site-layout-content-login">
                        <Form onSubmit={this.handleSubmit} className="login-form">

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    View Inverntory log
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Export to Excel
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Visualize Data
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
            </Layout>
            <StreetCardFooter/>
        </Layout>;
        return (
            <div>{form}</div>
        );
    }
}


//ReactDOM.render(<Greeter/>, document.getElementById('greeter'));

const WrappedServiceProvider = Form.create({name: "serviceProvider"})(
    ServiceProviderView
);

export default WrappedServiceProvider;
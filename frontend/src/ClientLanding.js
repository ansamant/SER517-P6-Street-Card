import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {Button, Form, Icon, Input, Layout} from 'antd';
import Header from './Header'
import StreetCardFooter from './StreetCardFooter'

const {Content} = Layout;


class ClientLanding extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            items: {},
            isLoaded: false,
        }
        this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {

            if (!err) {
                fetch('http://localhost:8000/homeless/' + values.personId + '/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(res => res.json())
                    .then(json => {
                        console.log(json)
                        this.props.handleHomelessPersonJson(json);
                        this.props.history.push('/clientInfo');
                    });

            }
        });
    };


    handleSuccessfulLogoutAction() {
        this.props.handleLogout();
        this.props.history.push('/login');
    }

    render() {
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
        return (
            <Layout>

                <Header
                    handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                    loggedInStatus={this.state.loggedInStatus}
                />
                <Content className="content-login">
                    <div className="site-layout-content-login">
                        <Form onSubmit={this.handleSubmit}>
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
                <StreetCardFooter/>
            </Layout>
        );
    }
}


const WrappedClientClientLanding = Form.create({name: "clientLanding"})(
    ClientLanding
);

export default WrappedClientClientLanding;

import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import {Alert, Button, Form, Icon, Input, Layout} from 'antd';
import Header from '../Header'
import StreetCardFooter from '../StreetCardFooter'

const {Content} = Layout;
const displayerror = [];
class ForgotPassword extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            loginPageStatus: "LOGIN_HEADER"
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit = e => {
        // e.preventDefault();
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         fetch('http://localhost:8000/api/token/', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify(values)
        //         })
        //             .then(res =>{
        //                 if(res.status===200){
        //                     return res.json();
        //                 }
        //                 else{
        //                     return null;
        //                 }
        //             })
        //             .then((resp) => {
        //                 if(resp===null){
        //                     this.props.history.push('/loginError');
        //                 }
        //                 else{
        //                     this.props.handleLogin(resp, values.username);
        //                     this.props.history.push('/social');
        //                 }
        //             });
        //     }
        // });
    };


    handleAlternate = e => {
       console.log("Forgot password clicked");
       this.props.history.push('/login');
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        let form;
        form = <Layout className="layout">
            <Header loginPageStatus={this.state.loginPageStatus}/>
              <Alert
                            message="Forgot Password"
                            description="- An access code has been sent to your registered email"
                            type="info"
                            closeText="X"
                            showIcon
                />
                <Content className="content-login">
                    <div className="site-layout-content-login" >
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Item>
                                    {getFieldDecorator('access code', {
                                        rules: [{required: true, message: 'Please input your access code!'}],
                                    })(
                                        <Input
                                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                            placeholder="access code"
                                        />,
                                    )}
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Submit
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button onClick={this.handleAlternate.bind(this)} type="primary" className="login-form-button">
                                        Back to Login
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                </Content>
                <StreetCardFooter/>
            </Layout>;
        return (
            <div>{form} </div>
        );
    }
}

const ForgotPasswordForm = Form.create({name: "forgotPassword"})(
    ForgotPassword
);

export default ForgotPasswordForm;
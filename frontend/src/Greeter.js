import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Input, Button, Descriptions} from 'antd';
import Header from './HeaderCommon.js'
import StreetCardFooter from './StreetCardFooter'

class Greeter extends React.Component{
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 }
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 }
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
        return(
            <div>
                <Header/>,
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className="registration-form ">
                    <h1>Enter Magstripe Id:</h1>
                    <Form.Item label="homelessID">
                        {getFieldDecorator("username", {
                            rules: [
                            {
                                required: true,
                                message: "Please input personalId!",
                                whitespace: true
                            }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const WrappedGreeterForm = Form.create({ name: "greeter" })(
    Greeter
  );
  
  export default WrappedGreeterForm;

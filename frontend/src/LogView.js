import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import {Form, Button, Table} from 'antd';
import Header from './HeaderCommon.js'
import StreetCardFooter from './StreetCardFooter'
/**
 * Creating a table for rendering the timestamp logo.
 * Table should display info based on what is known about the user
 */

 const dataSource = [{'datetime': '12034', 'service provider': 'Soup kitchen'}];
 const columns = ['datetime', 'service provider'];

class LogView extends React.Component{
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
                <Header/> 
                <Form {...formItemLayout} className="logView">
                  <Form.Item  onSubmit={this.handleSubmit}label="LogTable">
                  <Table dataSource={dataSource} columns={columns}  />
                  </Form.Item>
                  <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Refresh
                        </Button>
                  </Form.Item>     
                </Form>    
                <StreetCardFooter/>
              </div>
          );
    }
}

const WrappedLogTable = Form.create({ name: "log" })(
    LogView
  );
  
  export default WrappedLogTable;
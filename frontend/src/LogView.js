import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import {Form, Button, Table} from 'antd';
import StreetCardHeader from './HeaderCommon.js'
import StreetCardFooter from './StreetCardFooter'
import { withRouter } from 'react-router-dom';
/**
 * Creating a table for rendering the timestamp logo.
 * Table should display info based on what is known about the user
 */

 //dataSource will come based on 
 
class LogView extends React.Component{
  constructor(props){
      super(props);
      this.state ={
        isLoaded: false,
        columns : [
          {
            title: 'DateTime',
            dataIndex: 'datetime',
          },
          {
            title: 'Personal ID',
            dataIndex: 'personalId',
          },
          {
            title: 'Service Provider',
            dataIndex: 'serviceProvider',
          },
         ],
         dataSource : [
           {
             id: '',
            datetime : '',
            serviceProvider : '',
            personalId: '',
          }
        ]

      }
  }

  componentDidMount () {
    //fetch('http://127.0.0.1:8000/homeless/' + this.props.personalId +'/logs/',{
    fetch('http://127.0.0.1:8000/homeless/' + 4808684002 + '/logs/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
    })
     .then(res => res.json())
     .then(json => {
         console.log(json)
         this.setState({
             isLoaded: true,
             dataSource: json,
             }
         )
     })
  console.log(this.items);
}
    render(){
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
                offset: 4
              }
              
            }

          };

          if(this.state.isLoaded== true){
            return(
              <div>
                <StreetCardHeader/>
                  <Form {...formItemLayout} className="log-view-table" style={{padding: 40}}>
                  <Form.Item name="log-table">
                      <center><h1>Time Log</h1></center>
                  </Form.Item>
                  <Form.Item {...tailFormItemLayout}>
                     <Table dataSource={this.state.dataSource} columns={this.state.columns}/>
                    </Form.Item>
                </Form>
                
                
                <StreetCardFooter/>
                
              </div>
            );
          }
          else{
            return(
              <div>
                <StreetCardHeader/>
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className="log-view-table" padding="80px">
                  <Form.Item name="log-table">
                      <center><h1>Time Log</h1></center>
                  </Form.Item>
                  <Form.Item {...tailFormItemLayout} >
                        
                        <center><h1>Table is not loaded, please click refresh button </h1></center>
                        
                    </Form.Item>
                </Form>
                <StreetCardFooter/>
                
              </div>
          );
          }
          
    }
}

const WrappedLogTable = Form.create({ name: "log" })(
    LogView
  );
  
  export default WrappedLogTable;
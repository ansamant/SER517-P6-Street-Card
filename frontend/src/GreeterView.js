import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Input, Button} from 'antd';
import Header from './HeaderCommon.js'
import StreetCardFooter from './StreetCardFooter'

class GreeterView extends React.Component{


  constructor(props) {
    super(props);
    this.state = {
        isLoaded: false,
        name : "",
    }
  }
  

  componentDidMount() {
    
  }
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {

      if (!err) {
        
        var registerRequestObject = {};
        registerRequestObject.serviceProvider = "FP";
        //registerRequestObject.serviceProvider = this.props.clearanceLevel;
        fetch('http://localhost:8000/homeless/' + values.personalId + '/logs/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          },
          body: JSON.stringify(registerRequestObject)
        })
          .then(res => res.json())
          .then(
            json => {
            console.log("register response:", json);
          });

          fetch('http://localhost:8000/homeless/' + values.personalId+'/',{
            method : 'GET',
            headers: {
              'Content-Type' : 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
            
          })
          .then(res => res.json())
          .then(json=>{
            console.log("JSON" + json)
            this.setState({
              isLoaded: true,
              name : json['FirstName'] + ' ' + json['LastName'],
            })
          });
      }
    });
  };

    render(){
       // const {items} = this.state;
        const {name}  = this.state;
        const{isLoaded} = this.state;
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
        if(this.state.isLoaded == true){
          return(
            <div>

                <Header/>,
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className="log-post-form ">
                    <h1>Enter Magstripe Id:</h1>
                    <Form.Item label="clientID">
                        {getFieldDecorator("personalId", {
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
                     <center><h2>Hello {this.state.name}</h2></center> 
                </Form>
                <StreetCardFooter/>
            </div>
          );
        }else{
          return(
            <div>

                <Header/>,
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className="log-form ">
                    <h1>Enter Magstripe Id:</h1>
                    <Form.Item label="clientID">
                        {getFieldDecorator("personalId", {
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
                <StreetCardFooter/>
            </div>
        );
        }
        
    }
}

//ReactDOM.render(<Greeter/>, document.getElementById('greeter'));

const WrappedGreeterForm = Form.create({ name: "greeter" })(
    GreeterView
  );
  
  export default WrappedGreeterForm;

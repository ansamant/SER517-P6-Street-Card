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
        items: {},
        isLoaded: false,
    }
  }
  

  componentDidMount() {
    fetch('http://127.0.0.1:8000/homeless/', {
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
                 items: json.results,
                 }
             )
         })
      console.log(this.items);
  }
  

    render(){
        const {isLoaded, items} = this.state;
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
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className="log-form ">
                    <h1>Enter Magstripe Id:</h1>
                    <Form.Item label="clientID">
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
                    <Form.Item >
                      <div>{items.map(item => (<li key={item.PersonalId}>PersonalId : {item.PersonalId} | FirstName : {item.FirstName} </li>))}</div>
                    </Form.Item>
                </Form>
                <StreetCardFooter/>
            </div>
        );
    }
}

//ReactDOM.render(<Greeter/>, document.getElementById('greeter'));

const WrappedGreeterForm = Form.create({ name: "greeter" })(
    GreeterView
  );
  
  export default WrappedGreeterForm;

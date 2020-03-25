import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Descriptions} from 'antd';
import Header from './Header'
import StreetCardFooter from './StreetCardFooter'

class ClientPersonalInfo extends React.Component{


 constructor(props) {
      super(props);
      this.state = {
          items: {},
          isLoaded: false,
      }
      this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);
    }


  handleSuccessfulLogoutAction() {
    this.props.handleLogout();
    this.props.history.push('/login');
  }

    render(){
          const formItemLayout = {
            labelCol: {
              xs: { span: 10 },
              sm: { span: 2 }
            },
            wrapperCol: {
              xs: { span: 10 },
              sm: { span: 6 }
            }
          };
     return(
         <Form {...formItemLayout} className="client-Info">
            <Descriptions title="Your Personal Info" bordered>
                <Descriptions.Item label="First Name">Prashansa</Descriptions.Item>
                <Descriptions.Item label="Middle Name"> </Descriptions.Item>
                <Descriptions.Item label="Last Name"> </Descriptions.Item>
                <Descriptions.Item label="Name Suffix"> </Descriptions.Item>
                <Descriptions.Item label="SSN" > 1234567</Descriptions.Item>
                <Descriptions.Item label="DOB"> </Descriptions.Item>
                <Descriptions.Item label="Race"> </Descriptions.Item>
                <Descriptions.Item label="Ethnicity"> </Descriptions.Item>
                <Descriptions.Item label="Gender">Female</Descriptions.Item>
                <Descriptions.Item label="Veteran Status"> </Descriptions.Item>
                <Descriptions.Item label="Phone Number Prefix"> +91 </Descriptions.Item>
                <Descriptions.Item label="Phone Number"> 99090909090</Descriptions.Item>
                <Descriptions.Item label="Email"> 99090909090</Descriptions.Item>
            </Descriptions>
         </Form>
     );
   }
}


const WrappedClientPersonalInfo = Form.create({ name: "clientLanding" })(
    ClientPersonalInfo
  );

  export default WrappedClientPersonalInfo;

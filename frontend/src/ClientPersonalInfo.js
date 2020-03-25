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
          clientInfo: {},
          isLoaded: false,
      }
      this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);
    }
  componentDidMount() {
     fetch('http://127.0.0.1:8000/homeless/' + '4808584002/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        })
         .then(res => res.json())
         .then(json => {
            console.log(json)
             this.setState({
                clientInfo: json,
              }
          )

         })
        console.log(this.state.homelessData);

  }

  handleSuccessfulLogoutAction() {
    this.props.handleLogout();
    this.props.history.push('/login');
  }

    render(){
          const {clientInfo} = this.state;
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
                <Descriptions.Item label="First Name">{clientInfo.FirstName}</Descriptions.Item>
                <Descriptions.Item label="Middle Name">{clientInfo.MiddleName}</Descriptions.Item>
                <Descriptions.Item label="Last Name">{clientInfo.LastName}</Descriptions.Item>
                <Descriptions.Item label="Name Suffix">{clientInfo.NameSuffix}</Descriptions.Item>
                <Descriptions.Item label="Social Security Number" >{clientInfo.SSN}</Descriptions.Item>
                <Descriptions.Item label="Date of Birth">{clientInfo.DOB}</Descriptions.Item>
                <Descriptions.Item label="Race">{clientInfo.Race}</Descriptions.Item>
                <Descriptions.Item label="Ethnicity">{clientInfo.Ethnicity}</Descriptions.Item>
                <Descriptions.Item label="Gender">{clientInfo.Gender}</Descriptions.Item>
                <Descriptions.Item label="Veteran Status">{clientInfo.VeteranStatus}</Descriptions.Item>
                <Descriptions.Item label="Phone Number Prefix">{clientInfo.PhoneNumberPrefix}</Descriptions.Item>
                <Descriptions.Item label="Phone Number">{clientInfo.PhoneNumber}</Descriptions.Item>
                <Descriptions.Item label="Email">{clientInfo.Email}</Descriptions.Item>
            </Descriptions>
         </Form>
     );
   }
}


const WrappedClientPersonalInfo = Form.create({ name: "clientLanding" })(
    ClientPersonalInfo
  );

  export default WrappedClientPersonalInfo;

import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Descriptions, Collapse, Alert} from 'antd';
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
     console.log(this.state.homelessPersonId);
     fetch('http://127.0.0.1:8000/homeless/' + this.state.homelessPersonId + '/', {
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


  }

  handleSuccessfulLogoutAction() {
    this.props.handleLogout();
    this.props.history.push('/login');
  }

    render(){
          const { Panel } = Collapse;
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
         <div>
          <Header
                  handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                  loggedInStatus={this.props.loggedInStatus}
          />
          <Collapse defaultActiveKey={['1']}>
          <Panel header="Click here to view your recent appointments" key="1">
          <Form {...formItemLayout} className="client-Info">
              <Alert
                message="Appointment Notification"
                description="You have an upcoming appointment at:-----"
                type="info"
                showIcon
              />
         </Form>
         </Panel>
          <Panel header="Click here to view your personal Information" key="2">
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
         </Panel>
         </Collapse>

          <StreetCardFooter/>
         </div>
     );
   }
}


const WrappedClientPersonalInfo = Form.create({ name: "clientLanding" })(
    ClientPersonalInfo
  );

  export default WrappedClientPersonalInfo;

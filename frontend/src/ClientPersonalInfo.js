import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {Collapse, Descriptions, Form, Layout} from 'antd';
import Header from './Header'
import StreetCardFooter from './StreetCardFooter'

const {Content} = Layout;

class ClientPersonalInfo extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.appointmentData)
        this.state = {
            clientInfo: this.props.homelessData,
            isLoaded: false,
            appointment: {},
        }
        this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this)
        this.test = this.test.bind(this)
    }

    test() {
        let abc = this.props.homelessData.PersonalId;
        fetch('http://127.0.0.1:8000/homeless/' + abc + '/appointment/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(res => res.json())
            .then(json => {
                this.setState({
                        isLoaded: true,
                        appointment: json,
                    }
                )
            })
    }

    componentDidMount() {
        setTimeout(this.test(), 5000);

    }

    handleSuccessfulLogoutAction() {
        this.props.handleLogout();
        this.props.history.push('/login');
    }

    render() {
        let race;
        switch (this.state.clientInfo.Race) {
            case 1:
                race = "American India or Alaskan Native";
                break;
            case 2:
                race = "Asian";
                break;
            case 3:
                race = "Black or African American";
                break;
            case 4:
                race = "Native Hawaiian or Pacific Islander";
                break;
            case 5:
                race = "White";
                break;
            case 8:
                race = "Client Doesn\'t Know";
                break;
            case 9:
                race = "Client Refused";
                break;
            case 99:
                race = "Data Not Collected";
                break;
        }
        let ethnicity;
        switch (this.state.clientInfo.Ethnicity) {
            case 0:
                ethnicity = "Non Hispanic/Non Latino";
                break;
            case 1:
                ethnicity = "Hispanic/Latino";
                break;
            case 8:
                ethnicity = "Client Doesn\'t Know";
                break;
            case 9:
                ethnicity = "Client Refused";
                break;
            case 99:
                ethnicity = "Data Not Collected";
                break;
        }
        let gender;
        switch (this.state.clientInfo.Gender) {
            case 0:
                gender = "Female";
                break;
            case 1:
                gender = "Male";
                break;
            case 3:
                gender = "Trans Female";
                break;
            case 4:
                gender = "Trans Male";
                break;
            case 5:
                gender = "Gender Non-Conforming";
                break;
            case 8:
                gender = "Client Doesn\'t Know";
                break;
            case 9:
                gender = "Client Refused";
                break;
            case 99:
                gender = "Data Not Collected";
                break;
        }
        let veteranStatus;
        switch (this.state.clientInfo.VeteranStatus) {
            case 0:
                veteranStatus = "No";
                break;
            case 1:
                veteranStatus = "Yes";
                break;
            case 8:
                veteranStatus = "Client Doesn\'t Know";
                break;
            case 9:
                veteranStatus = "Client Refused";
                break;
            case 99:
                veteranStatus = "Data Not Collected";
                break;
        }

        const {Panel} = Collapse;

        const formItemLayout = {
            labelCol: {
                xs: {span: 10},
                sm: {span: 2}
            },
            wrapperCol: {
                xs: {span: 10},
                sm: {span: 6}
            }
        };

        return (
            <Layout>
                <Header
                    handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                    loggedInStatus={this.props.loggedInStatus}
                />
                <Content className="content-login">
                    <div className="site-layout-content-login">
                        {!this.state.isLoaded && <p> Data Loading</p>}
                        {this.state.isLoaded && <p> {this.state.appointment[0].appointmentId}</p>}
                        <Descriptions title="Your Personal Info" bordered>
                            <Descriptions.Item
                                label="First Name">{this.state.clientInfo.FirstName}</Descriptions.Item>
                            <Descriptions.Item
                                label="Middle Name">{this.state.clientInfo.MiddleName}</Descriptions.Item>
                            <Descriptions.Item
                                label="Last Name">{this.state.clientInfo.LastName}</Descriptions.Item>
                            <Descriptions.Item
                                label="Name Suffix">{this.state.clientInfo.NameSuffix}</Descriptions.Item>
                            <Descriptions.Item
                                label="Social Security Number">{this.state.clientInfo.SSN}</Descriptions.Item>
                            <Descriptions.Item label="Date of Birth">{this.state.clientInfo.DOB}</Descriptions.Item>
                            <Descriptions.Item label="Race">{race}</Descriptions.Item>
                            <Descriptions.Item label="Ethnicity">{ethnicity}</Descriptions.Item>
                            <Descriptions.Item label="Gender">{gender}</Descriptions.Item>
                            <Descriptions.Item label="Veteran Status">{veteranStatus}</Descriptions.Item>
                            <Descriptions.Item
                                label="Phone Number Prefix">{this.state.clientInfo.PhoneNumberPrefix}</Descriptions.Item>
                            <Descriptions.Item
                                label="Phone Number">{this.state.clientInfo.PhoneNumber}</Descriptions.Item>
                            <Descriptions.Item label="Email">{this.state.clientInfo.Email}</Descriptions.Item>
                        </Descriptions>
                    </div>
                </Content>
                <StreetCardFooter/>
            </Layout>


        )
            ;

    }
}


const
    WrappedClientPersonalInfo = Form.create({name: "clientLanding"})(
        ClientPersonalInfo
    );

export default WrappedClientPersonalInfo;

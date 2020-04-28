import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {Alert, Collapse, Descriptions, Form, Layout} from 'antd';
import Header from './Header'
import StreetCardFooter from './StreetCardFooter'
import moment from "moment";

const {Content} = Layout;

class ClientPersonalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientInfo: this.props.homelessData,
            isLoaded: false,
            appointment: {},
        }
        this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this)
        this.test = this.test.bind(this)
    }

    test() {
        let homelessPersonId = this.props.homelessData.PersonalId;
        fetch(process.env.REACT_APP_IP + 'homeless/' + homelessPersonId + '/appointment/', {
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
        setTimeout(this.test(), 7000);

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
        const alert = []
        for (let appoint in this.state.appointment) {
            if (this.state.isLoaded &&
                moment(this.state.appointment[appoint].Date)> moment()) {
                let description = 'You have upcoming appointment on ' + moment(this.state.appointment[appoint].Date).format("MM/DD/YYYY") + ' at ' + moment(this.state.appointment[appoint].Time, "LT").format("LT")
                alert.push(<Alert message="Appointment Information"
                                  description={description}
                                  type="warning"
                                  closeText="X"
                                  showIcon
                />)
            } else if (this.state.isLoaded && moment(this.state.appointment[appoint].Date).format("MM/DD/YYYY") === moment().format("MM/DD/YYYY") && moment(this.state.appointment[appoint].Time, "LT").format("LT") >= moment().format("LT")) {
                let description = 'You have upcoming appointment on ' + moment(this.state.appointment[appoint].Date).format("MM/DD/YYYY") + ' at ' + moment(this.state.appointment[appoint].Time, "LT").format("LT")
                alert.push(<Alert message="Appointment Information"
                                  description={description}
                                  type="warning"
                                  closeText="X"
                                  showIcon
                />)
            } else if (!this.state.isLoaded) {
                let description = 'Data Loading . . .'
                alert.push(<Alert message="Appointment Information"
                                  description={description}
                                  type="warning"
                                  showIcon
                />)
            } else {
                alert.push()
            }
        }
        
        return (
            <Layout>
                <Header
                    handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                    loggedInStatus={this.props.loggedInStatus}
                />
                {alert}
                <Content className="content-login">
                    <div className="site-layout-content-login">
                        <div style={{textAlign: "left"}}>
                            <Descriptions title="Personal Information" bordered
                                          column={{xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1}}>
                                <Descriptions.Item
                                    label="Full Name">{this.state.clientInfo.FirstName} {this.state.clientInfo.MiddleName} {this.state.clientInfo.LastName} {this.state.clientInfo.NameSuffix}</Descriptions.Item>
                                <Descriptions.Item
                                    label="Social Security Number">{this.state.clientInfo.SSN}</Descriptions.Item>
                                <Descriptions.Item
                                    label="Date of Birth">{moment(this.state.clientInfo.DOB).format("MM/DD/YYYY")}</Descriptions.Item>
                                <Descriptions.Item label="Race">{race}</Descriptions.Item>
                                <Descriptions.Item label="Ethnicity">{ethnicity}</Descriptions.Item>
                                <Descriptions.Item label="Gender">{gender}</Descriptions.Item>
                                <Descriptions.Item label="Veteran Status">{veteranStatus}</Descriptions.Item>
                                <Descriptions.Item
                                    label="Phone Number">{this.state.clientInfo.PhoneNumberPrefix} {this.state.clientInfo.PhoneNumber}</Descriptions.Item>
                                <Descriptions.Item label="Email">{this.state.clientInfo.Email}</Descriptions.Item>
                            </Descriptions>
                        </div>
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

import React, {Component} from "react";
import "antd/dist/antd.css";
import {Cascader, Col, Collapse, Form, Layout, Row} from "antd";
import Header from "../Header";
import StreetCardFooter from "../StreetCardFooter";
import SiderComponent from './SiderComponent'
import HomelessPreventionHUD from "./HomelessPreventionHUD";
import RapidReHousingVA from "./RapidReHousingVA";

const {Content} = Layout;
const {Panel} = Collapse;
const ProjectCategory = [
    {
        value: "HUD:CoC-HomelessPrevention",
        label: "HUD:CoC-HomelessPrevention"
    },
    {
        value: "HUD:COC-Permanent Supportive Housing",
        label: "HUD:COC-Permanent Supportive Housing"
    },
    {
        value: 'HUD:COC-Rapid Re-Housing',
        label: 'HUD:COC-Rapid Re-Housing'
    },
    {
        value: 'HUD:CoC - Supportive Services Only',
        label: 'HUD:CoC - Supportive Services Only'
    },
    {
        value: 'HUD:CoC - SSO Coordinated Entry',
        label: 'HUD:CoC - SSO Coordinated Entry'
    },
    {
        value: 'HUD:CoC - Traditional Housing',
        label: 'HUD:CoC - Traditional Housing'
    },
    {
        value: 'HUD:CoC - Safe Haven',
        label: 'HUD:CoC - Safe Haven'
    },
    {
        value: 'HUD:CoC - Single Room Occupancy',
        label: 'HUD:CoC - Single Room Occupancy'
    },
    {
        value: 'HUD:CoC - Youth Homeless Demonstration Program',
        label: 'HUD:CoC - Youth Homeless Demonstration Program'
    },
    {
        value: "VA: HCHV CRS - EH",
        label: "VA: HCHV CRS - EH"
    },
    {
        value: "VA: HCHV - Low Demand Safe Haven",
        label: "VA: HCHV - Low Demand Safe Haven"
    },
    {
        value: "VA:Grant Per Diem – Bridge Housing",
        label: "VA:Grant Per Diem – Bridge Housing"
    },
    {
        value: "VA:Grant Per Diem – Low Demand",
        label: "VA:Grant Per Diem – Low Demand"
    },
    {
        value: "VA:Grant Per Diem – Hospital to Housing",
        label: "VA:Grant Per Diem – Hospital to Housing"
    },
    {
        value: "VA:Grant Per Diem – Clinical Treatment",
        label: "VA:Grant Per Diem – Clinical Treatment"
    },
    {
        value: "VA:Grant Per Diem – Service Intensive Transitional Housing",
        label: "VA:Grant Per Diem – Service Intensive Transitional Housing"
    },
    {
        value: "VA:Grant Per Diem – Transition in Place",
        label: "VA:Grant Per Diem – Transition in Place"
    },
    {
        value: "VA:Grant Per Diem – Case Management / Housing Retention",
        label: "VA:Grant Per Diem – Case Management / Housing Retention"
    },
    {
        value: "VA: SSVF - Homelessness Prevention",
        label: "VA: SSVF - Homelessness Prevention"
    },
    {
        value: "VA: SSVF - Rapid Re-Housing",
        label: "VA: SSVF - Rapid Re-Housing"
    }
];
const message = "Mandatory field! Please provide a response."
const changingPanel = []

class EnrollmentForm extends Component {
    constructor(props) {
        super(props);
        console.log("Hi " + this.props.homelessPersonId);
        this.state = {
            items: {},
            isLoaded: false,
            data: null
        }
        this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);
        this.setPagecomponent = this.setPagecomponent.bind(this);
    }

    handleSuccessfulLogoutAction() {
        this.props.handleLogout();
        this.props.history.push('/login');
    }

    setPagecomponent(pageComponentValue){
        this.props.updatePageComponent(pageComponentValue)
        this.props.history.push('/socialWorkerRegister');
    };

    componentDidMount() {
        changingPanel.pop();
        fetch('http://127.0.0.1:8000/homeless/' + this.props.homelessPersonId + '/', {
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
                        isLoaded: true,
                        items: json
                    }
                )
            })
    }

    handleChange = e => {
        switch (e[0]) {
            case "HUD:CoC-HomelessPrevention":
                changingPanel.pop();
                changingPanel.push(<HomelessPreventionHUD data={e[0]} personalId={this.state.items.PersonalId}
                                                          history={this.props.history}/>)
                break;
            case "VA: SSVF - Rapid Re-Housing":
                changingPanel.pop();
                changingPanel.push(<RapidReHousingVA data={e[0]} personalId={this.state.items.PersonalId}
                                                     history={this.props.history} />)
                break;
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Layout>
                <Header
                    handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                    loggedInStatus={this.props.loggedInStatus}/>
                <Layout>
                    <SiderComponent
                        setPagecomponent = {this.setPagecomponent}
                    />
                    <Content className="content-enroll">
                        <div className="site-layout-content-homeless">
                            <Collapse accordion style={{backgroundColor: "#f0f9ff"}}>
                                <Panel header="Select Program Category" key="9">
                                    <Row gutter={8}>
                                        <Col span={8}>
                                            < Form.Item label="Project Category">
                                                {getFieldDecorator("projectcategory", {
                                                    rules: [
                                                        {
                                                            type: "array",
                                                            required: true,
                                                            message: {message},
                                                        }
                                                    ]
                                                })(<Cascader options={ProjectCategory}
                                                             placeholder="Select.."
                                                             onChange={this.handleChange}/>)}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Panel>
                                {changingPanel}
                            </Collapse>
                        </div>
                    </Content>
                    <StreetCardFooter/>
                </Layout>
            </Layout>
        );
    }
}

const WrappedEnrollmentForm = Form.create({name: "enrollment"})(
    EnrollmentForm
);
export default WrappedEnrollmentForm;
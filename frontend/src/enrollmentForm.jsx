import React, {Component} from "react";
import "antd/dist/antd.css";
import {Cascader, Col, Collapse, Form, Layout, Row} from "antd";
import Header from "./Header";
import StreetCardFooter from "./StreetCardFooter";
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
        value: "VA: SSVF - Rapid Re-Housing",
        label: "VA: SSVF - Rapid Re-Housing"
    }
];
const message = "Mandatory field! Please provide a response."
const changingPanel = []

class EnrollmentForm extends Component {
    constructor(props) {
        super(props);

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

    setPagecomponent(pageComponentValue) {
        this.props.updatePageComponent(pageComponentValue)
        this.props.history.push('/socialWorkerRegister');
    };

    componentDidMount() {
        changingPanel.pop();
        fetch(process.env.REACT_APP_IP + 'homeless/' + this.props.homelessPersonId + '/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(res => {
            if (res.status == 200) {
                res.json().then(json => {
                    this.setState({
                            isLoaded: true,
                            items: json
                        }
                    )
                })
            } else if (Math.round(res.status / 100) == 4) {
                if (window.confirm("Error, invalid personal id: " + (res.status).toString())) {
                    this.props.history.push('/socialWorkerRegister');
                }
                else{
                     this.props.history.push('/socialWorkerRegister');
                }
            } else if (Math.round(res.status / 100) == 5) {
                if (window.confirm("Server Error: " + (res.status).toString())) {
                    this.props.history.push('/socialWorkerRegister');
                }
                else{
                     this.props.history.push('/socialWorkerRegister');
                }
            }
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
                                                     history={this.props.history}/>)
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
                        setPagecomponent={this.setPagecomponent}
                    />
                    <Content className="content-enroll">
                        <div className="site-layout-content-homeless">
                            <Collapse  style={{backgroundColor: "#f0f9ff"}} defaultActiveKey={['9']}>
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

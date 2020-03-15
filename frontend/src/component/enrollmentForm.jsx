import React, {Component} from "react";
import "antd/dist/antd.css";
import {Button, Cascader, Col, Collapse, DatePicker, Form, Input, Layout, Menu, Row, Select} from "antd";
import Header from "../Header";

const {Sider, Content, Footer} = Layout;
const {Option} = Select;
const {Panel} = Collapse;
const ResponseCategory = [
    {
        value: 0,
        label: "No"
    },
    {
        value: 1,
        label: "Yes"
    },
    {
        value: 8,
        label: "Client Doesn't Know"
    },
    {
        value: 9,
        label: "Client Refused"
    },
    {
        value: 99,
        label: "Data Not Collected"
    }
];
const YesNoResponse = [
    {
        value: 0,
        label: "No"
    },
    {
        value: 1,
        label: "Yes"
    },
];
const {TextArea} = Input;
const ProjectCategory = [
    {
        value: "HUD:CoC-HomelessPrevention",
        label: "HUD:CoC-HomelessPrevention"
    },
    {
        value: "HUD:HOPWA – Hotel/Motel Vouchers",
        label: "HUD:HOPWA – Hotel/Motel Vouchers"
    },
];
const EventCategory = [
    {
        value: 1,
        label: "Referral to a Prevention Assistance project"
    },
    {
        value: 2,
        label: "Problem Solving/Diversion/Rapid Resolution intervention or service"
    },
    {
        value: 3,
        label: "Scheduled Coordinated Entry Crisis Assessment"
    },
    {
        value: 4,
        label: "Scheduled Coordinated Entry Housing Needs Assessment"
    }
    , {
        value: 5,
        label: "Post Placement/ Follow-up Case Management"
    }
    , {
        value: 6,
        label: "Street Outreach Project or Services"
    }
    , {
        value: 7,
        label: "Housing Navigation Project or Services"
    },
    {
        value: 8,
        label: "Ineligible for continuum services"
    },
    {
        value: 9,
        label: "No availability in continuum services"
    }
    , {
        value: 10,
        label: "Emergency Shelter bed opening"
    },
    {
        value: 11,
        label: "Transitional Housing bed/unit opening"
    }
    , {
        value: 12,
        label: "Joint TH-RRH project/unit/resource opening"
    }
    , {
        value: 13,
        label: "RRH Project Resource Opening"
    }, {
        value: 14,
        label: "PSH Project Resource Opening"
    }, {
        value: 15,
        label: "Other Project/Unit/Resource Opening"
    }];
const AssessmentTypeCategory = [
    {
        value: 1,
        label: "Phone"
    },
    {
        value: 2,
        label: "Virtual"
    },
    {
        value: 3,
        label: "In Person"
    }
];
const AssessmentLevelCategory = [
    {
        value: 1,
        label: "Crisis Need Assessment"
    },
    {
        value: 2,
        label: "Housing Need Assessment"
    }
];
const PrioritizationStatusCategory = [
    {
        value: 1,
        label: "On Priority List"
    },
    {
        value: 2,
        label: "Not on Priority List"
    }
];
const LivingSituationResponse = [
    {
        value: 1,
        label: "Homeless"
    },
    {
        value: 2,
        label: "Institutional Housing"
    },
    {
        value: 3,
        label: "Temporary or Permanent Housing"
    },
    {
        value: 4,
        label: "Others"
    }];
const DomesticViolenceOccurrence = [
    {
        value: 1,
        label: "Past 3 Months"
    },
    {
        value: 2,
        label: "Three to six months ago"
    },
    {
        value: 3,
        label: "Six Months to One year"
    },
    {
        value: 4,
        label: "One year or more"
    },
    {
        value: 8,
        label: "Client Doesn\'t Know"
    },
    {
        value: 9,
        label: "Client Refused"
    },
    {
        value: 99,
        label: "Data Not Collected"
    },
];
const SubstanceAbuseCategory = [
    {
        value: 0,
        label: "No"
    },
    {
        value: 1,
        label: "Alcohol"
    },
    {
        value: 2,
        label: "Drug"
    },
    {
        value: 3,
        label: "Both Drug and Alcohol"
    },
    {
        value: 8,
        label: "Client Doesn\'t Know"
    },
    {
        value: 9,
        label: "Client Refused"
    },
    {
        value: 99,
        label: "Data Not Collected"
    }];
const InsuranceReasonCategory = [
    {
        value: 0,
        label:"Applied;decision pending"
    },
    {
        value: 1,
        label: "Applied;client not eligible"
    },
    {
        value: 2,
        label: "Applied;client not eligible"
    },
    {
        value: 3,
        label: "Client did not apply"
    },
    {
        value: 4,
        label: "Insurance type N/A for this client"
    },
    {
        value: 8,
        label: "Client Doesn\'t Know"
    },
    {
        value: 9,
        label: "Client Refused"
    },
    {
        value: 99,
        label: "Data Not Collected"
    }];

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 8
        },
        md: {
            span: 8
        }
    },
    wrapperCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 12
        }
    }
};

class EnrollmentForm extends Component {
    constructor(props) {
        super(props);
        console.log("Hi " + this.props.homelessPersonId);
        this.state = {
            items: {},
            isLoaded: false,
        }
        this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleSuccessfulLogoutAction() {
        this.props.handleLogout();
        this.props.history.push('/login');
    }

    handleClick = e => {
        if (e.key === '3') {
            this.setState({pageComponent: 'newAppointMent'})
        } else if (e.key === '4') {
            this.setState({pageComponent: 'viewAppointment'})
        } else if (e.key === '1') {
            this.setState({pageComponent: 'registerClient'})
        } else if (e.key === '2') {
            this.setState({pageComponent: 'updateInformation'})
        } else if (e.key === '5') {
            this.setState({pageComponent: 'loginfo'})
        } else if (e.key === '6') {
            this.setState({pageComponent: 'projectenroll'})
            this.props.history.push('/enrollment');
        }
    };

    componentDidMount() {
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
        console.log(this.items);

    }

    handleValue = e => {
        if (e !== null) {
            return e[0];
        } else
            return null;
    }
    handleOnSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var enrollmentRequestObject = {};
                enrollmentRequestObject.PersonalId = this.props.homelessPersonId;
                enrollmentRequestObject.DisablingCondition = this.handleValue(values.disablingcondition);
                enrollmentRequestObject.ProjectCategory = values.projectcategory[0];
                enrollmentRequestObject.EntryDate = values['entrydate'].format('YYYY-MM-DD');
                enrollmentRequestObject.ExitDate = values['exitdate'].format('YYYY-MM-DD');
                var nonCashBenefitsObject = {};
                nonCashBenefitsObject.InformationDate = values['informationdateNonCash'] != null ? values['informationdateNonCash'].format('YYYY-MM-DD') : null;
                nonCashBenefitsObject.BenefitsFromAnySource = values.benefitsfromanysources != null ? values.benefitsfromanysources[0] : null;
                nonCashBenefitsObject.SNAP = values.snap != null ? values.snap[0] : null;
                nonCashBenefitsObject.WIC = values.wic != null ? values.wic[0] : null;
                nonCashBenefitsObject.TANFChildCare = values.tanfchildcare != null ? values.tanfchildcare[0] : null;
                nonCashBenefitsObject.TANFTransportation = values.tanftransportation != null ? values.tanftransportation[0] : null;
                nonCashBenefitsObject.OtherTANF = values.othertanf != null ? values.othertanf[0] : null;
                nonCashBenefitsObject.OtherSource = values.othersources != null ? values.othersources[0] : null;
                nonCashBenefitsObject.SpecifySource = values.specifysource
                enrollmentRequestObject.non_cash_benefits = nonCashBenefitsObject;
                var incomeAndSourcesObject = {};
                incomeAndSourcesObject.InformationDate = values['informationdateIncome'] != null ? values['informationdateIncome'].format('YYYY-MM-DD') : null;
                incomeAndSourcesObject.IncomeFromAnySources = values.incomefromanysources != null ? values.incomefromanysources[0] : null;
                incomeAndSourcesObject.Earned = values.earned != null ? values.earned[0] : null;
                incomeAndSourcesObject.EarnedIncome = values.earnedincome;
                incomeAndSourcesObject.Unemployment = values.unemployment != null ? values.unemployment[0] : null;
                incomeAndSourcesObject.UnemploymentAmount = values.unemploymentamount;
                incomeAndSourcesObject.SSI = values.ssi != null ? values.ssi[0] : null;
                incomeAndSourcesObject.SSIAmount = values.ssiamount;
                incomeAndSourcesObject.SSDI = values.ssdi != null ? values.ssdi[0] : null;
                incomeAndSourcesObject.SSDIAmount = values.ssdiamount;
                incomeAndSourcesObject.VADisabilityService = values.vadisabilityservice != null ? values.vadisabilityservice[0] : null;
                incomeAndSourcesObject.VADisabilityServiceAmount = values.vadisabilityserviceamount;
                incomeAndSourcesObject.VADisabilityNonService = values.vadisabilitynonservice != null ? values.vadisabilitynonservice[0] : null;
                incomeAndSourcesObject.VADisabilityNonServiceNonAmount = values.vadisabilitynonserviceamount;
                incomeAndSourcesObject.PrivateDisability = values.privatedisability != null ? values.privatedisability[0] : null;
                incomeAndSourcesObject.PrivateDisabilityAmount = values.privatedisabilityamount;
                incomeAndSourcesObject.WorkersComp = values.workerscomp != null ? values.workerscomp[0] : null;
                incomeAndSourcesObject.WorkersCompAmount = values.workerscompamount;
                incomeAndSourcesObject.TANF = values.tanf != null ? values.tanf[0] : null;
                incomeAndSourcesObject.TANFAmount = values.tanfamount;
                incomeAndSourcesObject.GA = values.ga!=null? values.ga[0] : null;
                incomeAndSourcesObject.GAAmount = values.gaamount;
                incomeAndSourcesObject.SocSecRetirement = this.handleValue(values.socsecretirement);
                incomeAndSourcesObject.SocSecRetirementAmount = values.socsecretirementamount;
                incomeAndSourcesObject.Pension = this.handleValue(values.pension);
                incomeAndSourcesObject.PensionAmount = values.pensionamount;
                incomeAndSourcesObject.ChildSupport = this.handleValue(values.childsupport);
                incomeAndSourcesObject.ChildSupportAmount = values.childsupportamount;
                incomeAndSourcesObject.Alimony = this.handleValue(values.alimony);
                incomeAndSourcesObject.AlimonyAmount = values.alimonyamount;
                incomeAndSourcesObject.OtherIncomeSources = this.handleValue(values.otherincomesources);
                incomeAndSourcesObject.OtherIncomeSourcesAmount = values.otherincomesourcesamount;
                incomeAndSourcesObject.OtherIncomeSourcesIdentify = values.otherincomesourcesidentify;
                incomeAndSourcesObject.TotalMonthlyIncome = values.totalmonthlyincome;
                enrollmentRequestObject.income_and_sources = incomeAndSourcesObject;
                var healthInsuranceObject = {};
                healthInsuranceObject.InformationDate = values['informationdateHealth'].format['YYYY-MM-DD'];
                healthInsuranceObject.CoveredByHealthInsurance = this.handleValue(values.coveredbyhealthinsurance);
                healthInsuranceObject.Medicaid = this.handleValue(values.medicaid);
                healthInsuranceObject.Medicare = this.handleValue(values.medicare);
                healthInsuranceObject.SCHIP = this.handleValue(values.schip);
                healthInsuranceObject.VAMedicalServices = this.handleValue(values.vamedicalservices);
                healthInsuranceObject.EmployerProvided = this.handleValue(values.employerprovided);
                healthInsuranceObject.COBRA = this.handleValue(values.cobra);
                healthInsuranceObject.PrivatePay = this.handleValue(values.privatepay);
                healthInsuranceObject.StateHealthInsuranceForAdults = this.handleValue(values.statehealthinsuranceforadults);
                healthInsuranceObject.IndianHealthServices = this.handleValue(values.indianhealthservices);
                healthInsuranceObject.OtherInsurance = this.handleValue(values.otherinsurance);
                healthInsuranceObject.SpecifySource = values.specifysourceHealthInsurance;
                healthInsuranceObject.Reason = this.handleValue(values.reason);
                enrollmentRequestObject.health_insurance = healthInsuranceObject;
                console.log(enrollmentRequestObject);

                fetch('http://localhost:8000/homeless/' + this.props.homelessPersonId + '/enrollment/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(enrollmentRequestObject)
                })
                    .then(res => res.json())
                    .then(json => {
                        this.props.history.push('/socialWorkerRegister');
                    });
            }
        });
    }

    handleChange = e => {
        if (e == "HUD:CoC-HomelessPrevention") {
            console.log("Yes");
        } else if (e == "HUD:HOPWA – Hotel/Motel Vouchers") {
            console.log("No");
        }
    }


    render() {
        const {items} = this.state;
        const {getFieldDecorator} = this.props.form;
        return (
            <Layout className="layout">
                <Header
                    handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                    loggedInStatus={this.props.loggedInStatus}/>
                <Layout>
                    <Sider className="site-layout-sider">
                        <Menu style={{borderRight: '0px', backgroundColor: '#173e43'}} mode="inline"
                              defaultSelectedKeys={['6']}
                              onClick={this.handleClick}>
                            <Menu.Item style={{marginTop: '20px', color: '#fae596'}} key="1">
                                <span>Register Client</span>
                            </Menu.Item>
                            <Menu.Item style={{marginTop: '20px', color: '#fae596'}} key="2">
                                <span>Update Client Information</span>
                            </Menu.Item>
                            <Menu.Item style={{marginTop: '20px', color: '#fae596'}} key="3">
                                <span>Schedule Appointment</span>
                            </Menu.Item>
                            <Menu.Item style={{marginTop: '20px', color: '#fae596'}} key="4">
                                <span>View Appointment</span>
                            </Menu.Item>
                            <Menu.Item style={{marginTop: '20px', color: '#fae596'}} key="5">
                                <span>View Logs</span>
                            </Menu.Item>
                            <Menu.Item style={{marginTop: '20px', color: '#fae596'}} key="6">
                                <span>Project Enrollment</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content className="content">
                        <div className="site-layout-content-homeless">
                            <div className="homeless-enrollment-project">
                                <Form {...formItemLayout} name="enrollment"
                                      onSubmit={this.handleOnSubmit}>
                                    <Collapse accordion>
                                        <Panel header="Enrollment Details" key="1">
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name="personalid"
                                                        label="Personal Id"
                                                    >
                                                        <Input defaultValue={items.PersonalId} disabled={true}/>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    < Form.Item label="Disabling Condition">
                                                        {getFieldDecorator("disablingcondition", {
                                                            rules: [
                                                                {
                                                                    type: "array",
                                                                    required: false,
                                                                    message: "Please select your role!"
                                                                }
                                                            ]
                                                        })(<Cascader options={YesNoResponse}
                                                                     placeholder="Select.."/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    < Form.Item label="Project Category">
                                                        {getFieldDecorator("projectcategory", {
                                                            rules: [
                                                                {
                                                                    type: "array",
                                                                    required: false,
                                                                    message: "Please select your role!"
                                                                }
                                                            ]
                                                        })(<Cascader options={ProjectCategory}
                                                                     placeholder="Select.."
                                                                     onChange={this.handleChange}/>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Entry Date"
                                                    >
                                                        {getFieldDecorator("entrydate", {
                                                            rules: [
                                                                {
                                                                    required: false,
                                                                    message: "Please select the date!"
                                                                }
                                                            ]
                                                        })(<DatePicker style={{width: "100%"}}/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Exit Date"
                                                    >{getFieldDecorator("exitdate", {
                                                        rules: [
                                                            {
                                                                required: false,
                                                                message: "Please select the date!"
                                                            }
                                                        ]
                                                    })(
                                                        <DatePicker style={{width: "100%"}}/>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Panel>
                                        <Panel header="Non-Cash Benefits" key="2">
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item label="Information Date">
                                                        {getFieldDecorator("informationdateNonCash", {
                                                            rules: [
                                                                {
                                                                    message: "Please select the information date!",
                                                                    required: false
                                                                }
                                                            ]
                                                        })(
                                                            <DatePicker style={{width: "100%"}}/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Benefits Sources"
                                                    >{getFieldDecorator("benefitsfromanysources", {
                                                        rules: [
                                                            {
                                                                message: "Please select benefits from any other sources!",
                                                                required: false,
                                                                type: "array"
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={ResponseCategory}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="SNAP"
                                                    >{getFieldDecorator("snap", {
                                                        rules: [
                                                            {
                                                                message: "Please input the venue!",
                                                                type: "array",
                                                                required: false,
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="SNAP Info"
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="WIC"
                                                    >{getFieldDecorator("wic", {
                                                        rules: [
                                                            {
                                                                message: "Please select",
                                                                type: "array",
                                                                required: false,
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="TANFChildCare"
                                                    >{getFieldDecorator("tanfchildcare", {
                                                        rules: [
                                                            {
                                                                message: "Please input the venue!",
                                                                type: "array",
                                                                required: false,
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="TANFTransportation"
                                                    >{getFieldDecorator("tanftransportation", {
                                                        rules: [
                                                            {
                                                                message: "Please input the venue!",
                                                                type: "array",
                                                                required: false,
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="OtherTANF"
                                                    >{getFieldDecorator("othertanf", {
                                                        rules: [
                                                            {
                                                                message: "Please input the venue!",
                                                                type: "array",
                                                                required: false,
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Other Sources"
                                                    >{getFieldDecorator("othersources", {
                                                        rules: [
                                                            {
                                                                message: "Please input the venue!",
                                                                type: "array",
                                                                required: false,
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select"
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Specify Source"
                                                    >{getFieldDecorator("specifysource")(
                                                        <TextArea rows={2}/>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Panel>
                                        <Panel header="Income and Source" key="3">
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Information Date">
                                                        {getFieldDecorator("informationdateIncome", {
                                                            rules: [
                                                                {
                                                                    message: "Please select the information date!",
                                                                    required: false
                                                                }
                                                            ]
                                                        })(
                                                            <DatePicker style={{width: "100%"}}/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="IncomeFromAnySources"
                                                    >{getFieldDecorator("incomefromanysources", {
                                                        rules: [
                                                            {
                                                                message: "Please select income from any other sources!",
                                                                required: false,
                                                                type: "array"
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={ResponseCategory}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Earned"
                                                    >{getFieldDecorator("earned", {
                                                        rules: [
                                                            {
                                                                message: "Please Yes/No!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Earned"
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="EarnedIncome"
                                                    >{getFieldDecorator("EarnedIncome", {
                                                        rules: [
                                                            {
                                                                message: "Please provide income earned",
                                                                type: "integer",
                                                                required: false
                                                            }
                                                        ]
                                                    })(<Input/>
                                                    )}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Unemployment"
                                                    >{getFieldDecorator("unemployment", {
                                                        rules: [
                                                            {
                                                                message: "Please Yes/No!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Unemployment Amount"
                                                    >{getFieldDecorator("unemploymentamount", {
                                                        rules: [
                                                            {
                                                                message: "Please input the amount!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Input/>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="SSI"
                                                    >{getFieldDecorator("ssi", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="SSI Amount"
                                                    >{getFieldDecorator("ssiamount", {
                                                        rules: [
                                                            {
                                                                message: "Please input the venue!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Input/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="SSDI"
                                                    >{getFieldDecorator("ssdi", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="SSDIAmount"
                                                    >{getFieldDecorator("ssdiamount", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Input/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="VA Disability Service"
                                                    >{getFieldDecorator("vadisabilityservice", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="VA Disability Service Amount"
                                                    >{getFieldDecorator("vadisabilityserviceamount", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Input/>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="VA Disability Non-Service"
                                                    >{getFieldDecorator("vadisabilitynonservice", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="VADisabilityNonServiceNonAmount"
                                                    >{getFieldDecorator("vadisabilitynonservicenonamount", {
                                                        rules: [
                                                            {
                                                                message: "Please input the venue!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Input/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Private Disability"
                                                    >{getFieldDecorator("privatedisability", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Private Disability Amount"
                                                    >{getFieldDecorator("privatedisabilityamount", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Input/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Workers Comp"
                                                    >{getFieldDecorator("workerscomp", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Workers Comp Amount"
                                                    >{getFieldDecorator("workerscompamount", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Input/>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="TANF"
                                                    >{getFieldDecorator("tanf", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="TANF Amount"
                                                    >{getFieldDecorator("tanfamount", {
                                                        rules: [
                                                            {
                                                                message: "Please input the venue!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Input/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="GA"
                                                    >{getFieldDecorator("ga", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="GA Amount"
                                                    >{getFieldDecorator("gaamount", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Input/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Soc Sec Retirement"
                                                    >{getFieldDecorator("socsecretirement", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="SocSecRetirementAmount"
                                                    >{getFieldDecorator("socsecretirementamount", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Input/>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Pension"
                                                    >{getFieldDecorator("pension", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Pension Amount"
                                                    >{getFieldDecorator("pensionamount", {
                                                        rules: [
                                                            {
                                                                message: "Please input the venue!",

                                                                required: false,
                                                            }
                                                        ]
                                                    })(
                                                        <Input/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="ChildSupport"
                                                    >{getFieldDecorator("childsupport", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="ChildSupportAmount"
                                                    >{getFieldDecorator("Child Support Amount", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Input/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Alimony"
                                                    >{getFieldDecorator("alimony", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Alimony Amount"
                                                    >{getFieldDecorator("alimonyamount", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Input/>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Other Income Sources"
                                                    >{getFieldDecorator("otherincomesources", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Other Income Sources Amount"
                                                    >{getFieldDecorator("otherincomesourcesamount", {
                                                        rules: [
                                                            {
                                                                message: "Please input the venue!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Input/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Other Income Sources Identify"
                                                    >{getFieldDecorator("otherincomesourcesidentify")(
                                                        <TextArea rows={2}/>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Form.Item className="register-ant-form-item">
                                                <Button type="primary" htmlType="submit"
                                                        className="registration-submit-button">
                                                    Submit
                                                </Button>
                                            </Form.Item>
                                        </Panel>
                                        <Panel header="Health Insurance" key="4">
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Information Date">
                                                        {getFieldDecorator("informationdateHealth", {
                                                            rules: [
                                                                {
                                                                    message: "Please select the information date!",
                                                                    required: false
                                                                }
                                                            ]
                                                        })(
                                                            <DatePicker style={{width: "100%"}}/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="CoveredByHealthInsurance"
                                                    >{getFieldDecorator("coveredbyhealthinsurance", {
                                                        rules: [
                                                            {
                                                                message: "Please select income from any other sources!",
                                                                required: false,
                                                                type: "array"
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={ResponseCategory}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Medicaid"
                                                    >{getFieldDecorator("medicaid", {
                                                        rules: [
                                                            {
                                                                message: "Please Yes/No!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Medicaid"
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Medicare"
                                                    >{getFieldDecorator("Medicare", {
                                                        rules: [
                                                            {
                                                                message: "Please provide income earned",
                                                                required: false
                                                            }
                                                        ]
                                                    })(<Cascader
                                                            placeholder="Medicaid"
                                                            options={YesNoResponse}
                                                        ></Cascader>
                                                    )}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="SCHIP"
                                                    >{getFieldDecorator("SCHIP", {
                                                        rules: [
                                                            {
                                                                message: "Please Yes/No!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="VAMedicalServices"
                                                    >{getFieldDecorator("vamedicalservices", {
                                                        rules: [
                                                            {
                                                                message: "Please input the amount!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="EmployerProvided"
                                                    >{getFieldDecorator("employerprovided", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="COBRA"
                                                    >{getFieldDecorator("cobra", {
                                                        rules: [
                                                            {
                                                                message: "Please input the venue!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="PrivatePay"
                                                    >{getFieldDecorator("privatepay", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="StateHealthInsuranceForAdults"
                                                    >{getFieldDecorator("statehealthinsuranceforadults", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Input/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Indian Health Services"
                                                    >{getFieldDecorator("indianhealthservices", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Other Insurance"
                                                    >{getFieldDecorator("otherinsurance", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Input/>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="SpecifySource"
                                                    >{getFieldDecorator("specifysourceHealthInsurance", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Input/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Reason"
                                                    >{getFieldDecorator("reason", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={InsuranceReasonCategory}
                                                        ></Cascader>
                                                    )}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Workers Comp Amount"
                                                    >{getFieldDecorator("workerscompamount", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Input/>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Panel>
                                        <Panel header="Domestic Violence" key="5">
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Information Date">
                                                        {getFieldDecorator("informationdateHealth", {
                                                            rules: [
                                                                {
                                                                    message: "Please select the information date!",
                                                                    required: false
                                                                }
                                                            ]
                                                        })(
                                                            <DatePicker style={{width: "100%"}}/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="DomesticViolenceVictim"
                                                    >{getFieldDecorator("domesticviolencevictim", {
                                                        rules: [
                                                            {
                                                                message: "Please select income from any other sources!",
                                                                required: false,
                                                                type: "array"
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="WhenOccurred"
                                                    >{getFieldDecorator("WhenOccurred", {
                                                        rules: [
                                                            {
                                                                message: "Please Yes/No!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Medicaid"
                                                            options={DomesticViolenceOccurrence}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="CurrentlyFleeing"
                                                    >{getFieldDecorator("CurrentlyFleeing", {
                                                        rules: [
                                                            {
                                                                message: "Please provide income earned",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(<Cascader
                                                            placeholder="Medicaid"
                                                            options={ResponseCategory}
                                                        ></Cascader>
                                                    )}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Panel>
                                        <Panel header="Disabling Condition" key="6">
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Information Date">
                                                        {getFieldDecorator("informationdateHealth", {
                                                            rules: [
                                                                {
                                                                    message: "Please select the information date!",
                                                                    required: false
                                                                }
                                                            ]
                                                        })(
                                                            <DatePicker style={{width: "100%"}}/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Physical Disability"
                                                    >{getFieldDecorator("physical_disability", {
                                                        rules: [
                                                            {
                                                                message: "Please select income from any other sources!",
                                                                required: false,
                                                                type: "array"
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={ResponseCategory}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Physical Disability Impairing"
                                                    >{getFieldDecorator("physical_disability_impairing", {
                                                        rules: [
                                                            {
                                                                message: "Please Yes/No!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Medicaid"
                                                            options={ResponseCategory}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Developmental Disability"
                                                    >{getFieldDecorator("developmental_disability", {
                                                        rules: [
                                                            {
                                                                message: "Please provide income earned",
                                                                required: false
                                                            }
                                                        ]
                                                    })(<Cascader
                                                            placeholder="Medicaid"
                                                            options={ResponseCategory}
                                                        ></Cascader>
                                                    )}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Developmental Disability Impairing"
                                                    >{getFieldDecorator("developmental_disability_impairing", {
                                                        rules: [
                                                            {
                                                                message: "Please Yes/No!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={ResponseCategory}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Chronic Health"
                                                    >{getFieldDecorator("chronic_health", {
                                                        rules: [
                                                            {
                                                                message: "Please input the amount!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={ResponseCategory}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Chronic Health Impairing"
                                                    >{getFieldDecorator("chronic_health_impairing", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={ResponseCategory}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="HIV Aids"
                                                    >{getFieldDecorator("hiv_aids", {
                                                        rules: [
                                                            {
                                                                message: "Please input the venue!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={ResponseCategory}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="HIV Aids Impairing"
                                                    >{getFieldDecorator("hiv_aids_impairing", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={ResponseCategory}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Mental Health"
                                                    >{getFieldDecorator("mental_health", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                required: false,
                                                                type: "array"
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={ResponseCategory}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Mental Health Impairing"
                                                    >{getFieldDecorator("mental_health_impairing", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={ResponseCategory}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Substance Abuse"
                                                    >{getFieldDecorator("substance_abuse", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={SubstanceAbuseCategory}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Substance Abuse Impairing"
                                                    >{getFieldDecorator("substance_abuse_impairing", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={ResponseCategory}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Panel>
                                        <Panel header="Date of Engagement" key="7">
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Date Of Engagement">
                                                        {getFieldDecorator("dateofengagement", {
                                                            rules: [
                                                                {
                                                                    message: "Please select the information date!",
                                                                    required: false
                                                                }
                                                            ]
                                                        })(
                                                            <DatePicker style={{width: "100%"}}/>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Panel>
                                        <Panel header="Current Living Situation" key="8">
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Information Date">
                                                        {getFieldDecorator("informationdateCurrentLiving", {
                                                            rules: [
                                                                {
                                                                    message: "Please select the information date!",
                                                                    required: false
                                                                }
                                                            ]
                                                        })(
                                                            <DatePicker style={{width: "100%"}}/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="CurrentLivingSituation"
                                                    >{getFieldDecorator("currentlivingsituation", {
                                                        rules: [
                                                            {
                                                                message: "Please select income from any other sources!",
                                                                required: false,
                                                                type: "array"
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={LivingSituationResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Verified By Project"
                                                    >{getFieldDecorator("verifiedbyproject", {
                                                        rules: [
                                                            {
                                                                message: "Please Yes/No!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={ProjectCategory}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="HasToLeaveCurrentSituation"
                                                    >{getFieldDecorator("hastoleavecurrentsituation", {
                                                        rules: [
                                                            {
                                                                message: "Please provide income earned",
                                                                required: false
                                                            }
                                                        ]
                                                    })(<Cascader
                                                            placeholder="Select.."
                                                            options={ResponseCategory}
                                                        ></Cascader>
                                                    )}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="HasResourcesToObtainPermanentHousing"
                                                    >{getFieldDecorator("hasresourcestoobtainpermanenthousing", {
                                                        rules: [
                                                            {
                                                                message: "Please Yes/No!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={ResponseCategory}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="OwnershipInPermanentHousing"
                                                    >{getFieldDecorator("ownershipinpermanenthousing", {
                                                        rules: [
                                                            {
                                                                message: "Please input the amount!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={ResponseCategory}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="EmployerProvided"
                                                    >{getFieldDecorator("employerprovided", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="HasClientMoved"
                                                    >{getFieldDecorator("hasclientmoved", {
                                                        rules: [
                                                            {
                                                                message: "Please input the venue!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="LocationDetails"
                                                    >{getFieldDecorator("locationdetails", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Input/>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Panel>
                                        <Panel header="Bed Night Date" key="9">
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="BedNightDate">
                                                        {getFieldDecorator("bednightdate", {
                                                            rules: [
                                                                {
                                                                    message: "Please select the information date!",
                                                                    required: false
                                                                }
                                                            ]
                                                        })(
                                                            <DatePicker style={{width: "100%"}}/>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Panel>
                                        <Panel header="Coordinated Entry Assessment" key="10">
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Date Of Assessment">
                                                        {getFieldDecorator("dateofassessment", {
                                                            rules: [
                                                                {
                                                                    message: "Please select the information date!",
                                                                    required: false
                                                                }
                                                            ]
                                                        })(
                                                            <DatePicker style={{width: "100%"}}/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Assessment Location"
                                                    >{getFieldDecorator("assessmentlocation", {
                                                        rules: [
                                                            {
                                                                message: "Please select income from any other sources!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Input/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Assessment Type"
                                                    >{getFieldDecorator("assessmenttype", {
                                                        rules: [
                                                            {
                                                                message: "Please Yes/No!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Medicaid"
                                                            options={AssessmentTypeCategory}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Assessment Level Category"
                                                    >{getFieldDecorator("assessmentlevelcategory", {
                                                        rules: [
                                                            {
                                                                message: "Please provide income earned",
                                                                required: false
                                                            }
                                                        ]
                                                    })(<Cascader
                                                            placeholder="Assessment Level Category"
                                                            options={AssessmentLevelCategory}
                                                        ></Cascader>
                                                    )}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Assessment Question"
                                                    >{getFieldDecorator("assessmentquestion", {
                                                        rules: [
                                                            {
                                                                message: "Please Yes/No!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Assessment Answer"
                                                    >{getFieldDecorator("assessmentanswer", {
                                                        rules: [
                                                            {
                                                                message: "Please input the amount!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Input/>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="AssessmentResultType"
                                                    >{getFieldDecorator("assessmentresulttype", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Input/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Assessment Result"
                                                    >{getFieldDecorator("assessmentresult", {
                                                        rules: [
                                                            {
                                                                message: "Please input the venue!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Input/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Prioritization Status"
                                                    >{getFieldDecorator("prioritizationstatus", {
                                                        rules: [
                                                            {
                                                                message: "Please provide input!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={PrioritizationStatusCategory}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Panel>
                                        <Panel header="Coordinated Entry Event" key="11">
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Date Of Event">
                                                        {getFieldDecorator("dateofevent", {
                                                            rules: [
                                                                {
                                                                    message: "Please select the information date!",
                                                                    required: false
                                                                }
                                                            ]
                                                        })(
                                                            <DatePicker style={{width: "100%"}}/>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Event"
                                                    >{getFieldDecorator("event", {
                                                        rules: [
                                                            {
                                                                message: "Please select income from any other sources!",
                                                                required: false,
                                                                type: "array"
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={EventCategory}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="ClientHousedOrReHoused"
                                                    >{getFieldDecorator("clienthousedorrehoused", {
                                                        rules: [
                                                            {
                                                                message: "Please Yes/No!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="ClientHousedOrReHoused"
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="EnrolledInAfterCareProject"
                                                    >{getFieldDecorator("enrolledinaftercareproject", {
                                                        rules: [
                                                            {
                                                                message: "Please provide income earned",
                                                                required: false
                                                            }
                                                        ]
                                                    })(<Cascader
                                                            placeholder="Enrolled In After Care Project"
                                                            options={YesNoResponse}
                                                        ></Cascader>
                                                    )}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Location Of Housing"
                                                    >{getFieldDecorator("locationofhousing", {
                                                        rules: [
                                                            {
                                                                message: "Please Yes/No!",
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Referral Result"
                                                    >{getFieldDecorator("referralresult", {
                                                        rules: [
                                                            {
                                                                message: "Please input the amount!",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="Date Of Result">
                                                        {getFieldDecorator("dateofevent", {
                                                            rules: [
                                                                {
                                                                    message: "Please select the information date!",
                                                                    required: false
                                                                }
                                                            ]
                                                        })(
                                                            <DatePicker style={{width: "100%"}}/>)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Panel>
                                    </Collapse>
                                </Form>
                            </div>
                        </div>
                    </Content>
                </Layout>
                {/*<StreetCardFooter/>*/}
            </Layout>
        );
    }
}

const WrappedEnrollmentForm = Form.create({name: "enrollment"})(
    EnrollmentForm
);
export default WrappedEnrollmentForm;


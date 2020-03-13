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

    handleOnSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var enrollmentRequestObject = {};
                enrollmentRequestObject.PersonalId = this.props.homelessPersonId;
                enrollmentRequestObject.DisablingCondition = values.disablingcondition[0];
                enrollmentRequestObject.ProjectCategory = values.projectcategory[0];
                enrollmentRequestObject.EntryDate = values['entrydate'].format('YYYY-MM-DD');
                enrollmentRequestObject.ExitDate = values['exitdate'].format('YYYY-MM-DD');
                var nonCashBenefitsObject = {};
                nonCashBenefitsObject.InformationDate = values['informationdateNonCash'].format('YYYY-MM-DD');
                nonCashBenefitsObject.BenefitsFromAnySource = values.benefitsfromanysources[0];
                nonCashBenefitsObject.SNAP = values.snap[0];
                nonCashBenefitsObject.WIC = values.wic[0];
                nonCashBenefitsObject.TANFChildCare = values.tanfchildcare[0];
                nonCashBenefitsObject.TANFTransportation = values.tanftransportation[0];
                nonCashBenefitsObject.OtherTANF = values.othertanf[0];
                nonCashBenefitsObject.OtherSource = values.othersources[0];
                nonCashBenefitsObject.SpecifySource = values.specifysource;
                enrollmentRequestObject.non_cash_benefits = nonCashBenefitsObject;
                var incomeAndSourcesObject = {};
                incomeAndSourcesObject.InformationDate = values['informationdateIncome'].format('YYYY-MM-DD');
                incomeAndSourcesObject.IncomeFromAnySources = values.incomefromanysources[0];
                incomeAndSourcesObject.Earned = values.earned[0];
                incomeAndSourcesObject.EarnedIncome = values.earnedincome;
                incomeAndSourcesObject.Unemployment = values.unemployment[0];
                incomeAndSourcesObject.UnemploymentAmount = values.unemploymentamount;
                incomeAndSourcesObject.SSI = values.ssi[0];
                incomeAndSourcesObject.SSIAmount = values.ssiamount;
                incomeAndSourcesObject.SSDI = values.ssdi[0];
                incomeAndSourcesObject.SSDIAmount = values.ssdiamount;
                incomeAndSourcesObject.VADisabilityService = values.vadisabilityservice[0];
                incomeAndSourcesObject.VADisabilityServiceAmount = values.vadisabilityserviceamount;
                incomeAndSourcesObject.VADisabilityNonService = values.vadisabilitynonservice[0];
                incomeAndSourcesObject.VADisabilityNonServiceNonAmount = values.vadisabilitynonserviceamount;
                incomeAndSourcesObject.PrivateDisability = values.privatedisability[0];
                incomeAndSourcesObject.PrivateDisabilityAmount = values.privatedisabilityamount;
                incomeAndSourcesObject.WorkersComp = values.workerscomp[0];
                incomeAndSourcesObject.WorkersCompAmount = values.workerscompamount;
                incomeAndSourcesObject.TANF = values.tanf[0];
                incomeAndSourcesObject.TANFAmount = values.tanfamount;
                incomeAndSourcesObject.GA = values.ga[0];
                incomeAndSourcesObject.GAAmount = values.gaamount;
                incomeAndSourcesObject.SocSecRetirement = values.socsecretirement[0];
                incomeAndSourcesObject.SocSecRetirementAmount = values.socsecretirementamount;
                incomeAndSourcesObject.Pension = values.pension[0];
                incomeAndSourcesObject.PensionAmount = values.pensionamount;
                incomeAndSourcesObject.ChildSupport = values.childsupport[0];
                incomeAndSourcesObject.ChildSupportAmount = values.childsupportamount;
                incomeAndSourcesObject.Alimony = values.alimony[0];
                incomeAndSourcesObject.AlimonyAmount = values.alimonyamount;
                incomeAndSourcesObject.OtherIncomeSources = values.otherincomesources[0];
                incomeAndSourcesObject.OtherIncomeSourcesAmount = values.otherincomesourcesamount;
                incomeAndSourcesObject.OtherIncomeSourcesIdentify = values.otherincomesourcesidentify;
                incomeAndSourcesObject.TotalMonthlyIncome = values.totalmonthlyincome;
                enrollmentRequestObject.income_and_sources = incomeAndSourcesObject;
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
                                                                     placeholder="Select.."/>)}
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


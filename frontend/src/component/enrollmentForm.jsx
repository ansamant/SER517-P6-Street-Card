import React, {Component} from "react";
import "antd/dist/antd.css";
import {Button, Cascader, Checkbox, Col, Collapse, DatePicker, Form, Input, Layout, Menu, Row, Select} from "antd";
import Header from "../Header";
import {FormOutlined, UserOutlined} from "@ant-design/icons";
import CalendarOutlined from "@ant-design/icons/lib/icons/CalendarOutlined";
import ClockCircleOutlined from "@ant-design/icons/lib/icons/ClockCircleOutlined";
import StreetCardFooter from "../StreetCardFooter";
import SiderComponent from './SiderComponent'

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
const WhyNotEmployedCategory = [
    {
        value: 1,
        label: "WhyNotEmployedCategory"
    },
    {
        value: 2,
        label: "Unable to work"
    },
    {
        value: 3,
        label: "Not looking for work"
    }];
const TypeOfEmploymentCategory = [
    {
        value: 1,
        label: "Full-time"
    },
    {
        value: 2,
        label: "Part-time"
    }
];
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
const TypeOfServiceCategory = [
    {
        value: 1,
        label: "Outreach services"
    },
    {
        value: 2,
        label: "Case management services"
    },
    {
        value: 3,
        label: "Assistance obtaining VA benefits"
    },
    {
        value: 4,
        label: "Assistance obtaining/coordinating other public benefits"
    },
    {
        value: 5,
        label: "Direct provision of other public benefits"
    },
    {
        value: 6,
        label: "Other (non TFA)supportive service approved by VA"
    },
    {
        value: 7,
        label: "Extended Shallow Subsidy"
    },
    {
        value: 8,
        label: "Returning Homey"
    },
    {
        value: 9,
        label: "Rapid Resolution"
    }
];
const IfAssistanceObtainingVABenefitsCategory = [
    {
        value: 1,
        label: "VA vocational and rehabilitation counseling"
    },
    {
        value: 2,
        label: "Employment and training services"
    },
    {
        value: 3,
        label: "Educational assistance"
    },
    {
        value: 4,
        label: "Health care services"
    }
];
const IfAssistanceObtainingOrCoordinatingOtherPublicBenefitsCategory = [
    {
        value: 1,
        label: "Health care services"
    },
    {
        value: 2,
        label: "Daily living services"
    },
    {
        value: 3,
        label: "Personal financial planning services"
    },
    {
        value: 4,
        label: "Transportation services"
    },
    {
        value: 5,
        label: "Income support services"
    },
    {
        value: 6,
        label: "Fiduciary and representative payee services"
    },
    {
        value: 7,
        label: "Legal services - child support"
    },
    {
        value: 8,
        label: "Legal services - eviction prevention"
    },
    {
        value: 9,
        label: "Legal services - outstanding fines and penalties"
    },
    {
        value: 10,
        label: "Legal services - restore/acquire drivers license"
    },
    {
        value: 11,
        label: "Legal services - other"
    },
    {
        value: 12,
        label: "Child care"
    },
    {
        value: 13,
        label: "Housing counseling"
    }
];
const IfDirectProvisionOfOtherPublicBenefitsCategory = [
    {
        value: 1,
        label: "Personal financial planning services"
    },
    {
        value: 2,
        label: "Transportation services"
    },
    {
        value: 3,
        label: "Income support services"
    },
    {
        value: 4,
        label: "Fiduciary and representative payee services"
    },
    {
        value: 5,
        label: "Legal services - child support"
    },
    {
        value: 6,
        label: "Legal services - eviction prevention"
    },
    {
        value: 7,
        label: "Legal services - outstanding fines and penalties"
    },
    {
        value: 8,
        label: "Legal services - restore/acquire drivers license"
    },
    {
        value: 9,
        label: "Legal services - other"
    },
    {
        value: 10,
        label: "Child care"
    },
    {
        value: 11,
        label: "Housing counseling"
    }
];
const MilitaryBranchCategory = [
    {
        value: 1,
        label: "Army"
    },
    {
        value: 2,
        label: "Air Force"
    },
    {
        value: 3,
        label: "Navy"
    },
    {
        value: 4,
        label: "Marines"
    },
    {
        value: 6,
        label: "Coast Guard"
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
const DischargeStatusCategory = [
    {
        value: 1,
        label: "Honorable"
    },
    {
        value: 2,
        label: "General under honorable conditions"
    },
    {
        value: 6,
        label: "Under other than honorable conditions (OTH)"
    },
    {
        value: 4,
        label: "Bad conduct"
    },
    {
        value: 5,
        label: "Dishonorable"
    },
    {
        value: 7,
        label: "Uncharacterized"
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
const InsuranceReasonCategory = [
    {
        value: 0,
        label: "Applied;decision pending"
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
const SexualOrientationCategory = [
    {
        value: 1,
        label: "Heterosexual"
    },
    {
        value: 2,
        label: "Gay"
    },
    {
        value: 3,
        label: "Lesbian"
    },
    {
        value: 4,
        label: "Bisexual"
    },
    {
        value: 5,
        label: "Questioning/Unsure"
    },
    {
        value: 6,
        label: "Others"
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
    }
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
const message = "Mandatory field! Please provide a response."

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
        console.log(e);
        if (e != null) {
            return e[0];
        } else
            return null;
    };

    handleEmptyObject = obj => {
        for (const key in obj) {
            if (typeof (obj[key]) === 'object') {
                let ccount = 0;
                let count = 0;
                for (const x in obj[key]) {
                    count++;
                    if (obj[key][x] === null || obj[key][x] === undefined) {
                        ccount = ccount + 1;
                    }
                }
                if (ccount === count) {
                    delete obj[key];
                }
            }
        }
    };

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
                nonCashBenefitsObject.SpecifySource = values.specifysource;
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
                incomeAndSourcesObject.GA = values.ga != null ? values.ga[0] : null;
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
                healthInsuranceObject.InformationDate = values['informationdateHealth'] != null ? values['informationdateHealth'].format('YYYY-MM-DD') : null;
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
                var domesticViolenceObject = {};
                domesticViolenceObject.InformationDate = values['informationdateDV'] != null ? values['informationdateDV'].format('YYYY-MM-DD') : null;
                domesticViolenceObject.DomesticViolenceVictim = this.handleValue(values.domesticviolencevictim);
                domesticViolenceObject.WhenOccurred = this.handleValue(values.whenoccurred);
                domesticViolenceObject.CurrentlyFleeing = this.handleValue(values.currentlyfleeing);
                enrollmentRequestObject.domestic_violence = domesticViolenceObject;
                var disablingCondition = {};
                disablingCondition.InformationDate = values['informationdateDC'] != null ? values['informationdateDC'].format('YYYY-MM-DD') : null;
                disablingCondition.physical_disability = this.handleValue(values.physical_disability);
                disablingCondition.physical_disability_impairing = this.handleValue(values.physical_disability_impairing);
                disablingCondition.developmental_disability = this.handleValue(values.developmental_disability);
                disablingCondition.developmental_disability_impairing = this.handleValue(values.developmental_disability_impairing);
                disablingCondition.chronic_health = this.handleValue(values.chronic_health_impairing);
                disablingCondition.hiv_aids = this.handleValue(values.hiv_aids);
                disablingCondition.hiv_aids_impairing = this.handleValue(values.hiv_aids_impairing);
                disablingCondition.mental_health = this.handleValue(values.mental_health);
                disablingCondition.mental_health_impairing = this.handleValue(values.mental_health_impairing);
                disablingCondition.substance_abuse = this.handleValue(values.substance_abuse);
                disablingCondition.substance_abuse_impairing = this.handleValue(values.substance_abuse_impairing);
                enrollmentRequestObject.disabling_condition = disablingCondition;
                var dateofEngagementObject = {};
                dateofEngagementObject.DateOfEngagement = values['dateofengagement'] != null ? values['dateofengagement'].format('YYYY-MM-DD') : null;
                enrollmentRequestObject.date_of_engagement = dateofEngagementObject;
                var bedNightDateObject = {};
                bedNightDateObject.BedNightDate = values['bednightdate'] != null ? values['bednightdate'].format('YYYY-MM-DD') : null;
                enrollmentRequestObject.bed_night_date = bedNightDateObject;
                var currentLivingSituationObject = {};
                currentLivingSituationObject.InformationDate = values['informationdateCL'] != null ? values['informationdateCL'].format('YYYY-MM-DD') : null;
                currentLivingSituationObject.CurrentLivingSituation = this.handleValue(values.currentlivingsituation);
                currentLivingSituationObject.VerifiedByProject = this.handleValue(values.verifiedbyproject);
                currentLivingSituationObject.HasToLeaveCurrentSituation = this.handleValue(values.hastoleavecurrentsituation);
                currentLivingSituationObject.HasASubsequentResidence = this.handleValue(values.hasasubsequentresidence);
                currentLivingSituationObject.HasResourcesToObtainPermanentHousing = this.handleValue(values.hasresourcestoobtainpermanenthousing);
                currentLivingSituationObject.OwnershipInPermanentHousing = this.handleValue(values.ownershipinpermanenthousing);
                currentLivingSituationObject.HasClientMoved = this.handleValue(values.hasclientmoved);
                currentLivingSituationObject.LocationDetails = values.locationdetails;
                enrollmentRequestObject.current_living_situation = currentLivingSituationObject;
                var coordinatedEntryAssessmentObject = {};
                coordinatedEntryAssessmentObject.DateOfAssessment = values['dateofassessment'] != null ? values['dateofassessment'].format('YYYY-MM-DD') : null;
                coordinatedEntryAssessmentObject.AssessmentLocation = values.assessmentlocation;
                coordinatedEntryAssessmentObject.AssessmentType = this.handleValue(values.assessmenttype);
                coordinatedEntryAssessmentObject.AssessmentLevel = this.handleValue(values.assessmentlevel);
                coordinatedEntryAssessmentObject.AssessmentQuestion = values.assessmentquestion;
                coordinatedEntryAssessmentObject.AssessmentAnswer = values.assessmentanswer;
                coordinatedEntryAssessmentObject.AssessmentResultType = values.assessmentresulttype;
                coordinatedEntryAssessmentObject.AssessmentResult = values.assessmentresult;
                coordinatedEntryAssessmentObject.PrioritizationStatus = values.prioritizationstatus;
                enrollmentRequestObject.coordinated_entry_assessment = coordinatedEntryAssessmentObject;
                var coordinatedEntryEventObject = {};
                coordinatedEntryEventObject.DateOfEvent = values['dateofevent'] != null ? values['dateofevent'].format('YYYY-MM-DD') : null;
                coordinatedEntryEventObject.Event = this.handleValue(values.event);
                coordinatedEntryEventObject.ClientHousedOrReHoused = this.handleValue(values.clienthousedorrehoused);
                coordinatedEntryEventObject.EnrolledInAfterCareProject = this.handleValue(values.enrolledinaftercareproject);
                coordinatedEntryEventObject.LocationOfHousing = this.handleValue(values.locationofhousing);
                coordinatedEntryEventObject.ReferralResult = this.handleValue(values.referralresult);
                coordinatedEntryEventObject.DateOfResult = values['dateofresult'] != null ? values['dateofresult'].format('YYYY-MM-DD') : null;
                enrollmentRequestObject.coordinated_entry_event = coordinatedEntryEventObject;
                var sexualOrientationObject = {};
                sexualOrientationObject.SexualOrientation = this.handleValue(values.sexualorientation);
                sexualOrientationObject.Description = values.description;
                enrollmentRequestObject.sexual_orientation = sexualOrientationObject;
                var veteransInfoObject = {};
                veteransInfoObject.YearEnteredMilitaryService = values.yearenteredmilitaryservice;
                veteransInfoObject.YearSeparatedFromMilitaryService = values.yearseparatedfrommilitaryservice;
                veteransInfoObject.TheatreOfOperations_WorldWar2 = this.handleValue(values.theatreofoperations_worldwar2);
                veteransInfoObject.TheatreOfOperations_KoreanWar = this.handleValue(values.theatreofoperations_koreanwar);
                veteransInfoObject.TheatreOfOperations_VietnamWar = this.handleValue(values.theatreofoperations_vietnamwar);
                veteransInfoObject.TheatreOfOperations_PersianGulfWar = this.handleValue(values.theatreofoperations_persiangulfwar);
                veteransInfoObject.TheatreOfOperations_Afghanistan = this.handleValue(values.theatreofoperations_afghanistan);
                veteransInfoObject.TheatreOfOperations_Iraq_IraqiFreedom = this.handleValue(values.theatreofoperations_iraq_iraqifreedom);
                veteransInfoObject.TheatreOfOperations_Iraq_NewDawn = this.handleValue(values.theatreofoperations_iraq_newdawn);
                veteransInfoObject.TheatreOfOperations_OtherPeacekeepingOperations = this.handleValue(values.theatreofoperations_otherpeacekeepingoperations);
                veteransInfoObject.BranchOfMilitary = this.handleValue(values.branchofmilitary);
                veteransInfoObject.DischargeStatus = this.handleValue(values.dischargestatus);
                enrollmentRequestObject.veteran_Information = veteransInfoObject;
                var servicesProvidedSSVFObject = {};
                servicesProvidedSSVFObject.DateOfService = values['dateofservice'] != null ? values['dateofservice'].format('YYYY-MM-DD') : null;
                servicesProvidedSSVFObject.TypeOfService = this.handleValue(values.typeofservice);
                servicesProvidedSSVFObject.IfAssistanceObtainingVABenefits = this.handleValue(values.ifassistanceobtainingvabenefits);
                servicesProvidedSSVFObject.IfAssistanceObtainingOrCoordinatingOtherPublicBenefits = this.handleValue(values.ifassistanceobtainingorcoordinatingotherpublicbenefits);
                servicesProvidedSSVFObject.IfDirectProvisionOfOtherPublicBenefits = this.handleValue(values.ifdirectprovisionofotherpublicbenefits);
                servicesProvidedSSVFObject.IfOtherSupportiveServiceApprovedByVA = values.ifothersupportiveserviceapprovedbyva
                enrollmentRequestObject.services_Provided_SSVF = servicesProvidedSSVFObject;
                var connectionWithSOARObject = {};
                connectionWithSOARObject.ConnectionWithSOAR = this.handleValue(values.connectionwithsoar);
                enrollmentRequestObject.connection_With_SOAR = connectionWithSOARObject;
                var employmentStatusObject = {};
                employmentStatusObject.InformationDate = values['informationdate'] != null ? values['informationdate'].format('YYYY-MM-DD') : null;
                employmentStatusObject.Employed = this.handleValue(values.employed)
                employmentStatusObject.TypeOfEmployment = this.handleValue(values.typeofemployment)
                employmentStatusObject.WhyNotEmployed = this.handleValue(values.whynotemployed)
                enrollmentRequestObject.employment_Status = employmentStatusObject;
                this.handleEmptyObject(enrollmentRequestObject);
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
                            <Form {...formItemLayout} name="enrollment"
                                  onSubmit={this.handleOnSubmit}>
                                <Collapse accordion style={{backgroundColor: "#f0f9ff"}}>
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
                                                                required: true,
                                                                message: {message},
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
                                        <Row gutter={8}>
                                            <Col span={8}>
                                                <Form.Item
                                                    label="Entry Date"
                                                >
                                                    {getFieldDecorator("entrydate", {
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: {message}
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
                                                            required: true,
                                                            message: {message}
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
                                                                message: {message},
                                                                required: true
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
                                                            message: {message},
                                                            required: true,
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
                                                            message: {message},
                                                            type: "array",
                                                            required: true,
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
                                                            message: {message},
                                                            type: "array",
                                                            required: true,
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
                                                            message: {message},
                                                            type: "array",
                                                            required: true,
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
                                                            message: {message},
                                                            type: "array",
                                                            required: true
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
                                                            message: {message},
                                                            type: "array",
                                                            required: true,
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
                                                            message: {message},
                                                            type: "array",
                                                            required: true,
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
                                                                message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},

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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                    </Panel>
                                    <Panel header="Health Insurance" key="4">
                                        <Row gutter={8}>
                                            <Col span={8}>
                                                <Form.Item
                                                    label="Information Date">
                                                    {getFieldDecorator("informationdateHealth", {
                                                        rules: [
                                                            {
                                                                message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                    {getFieldDecorator("informationdateDV", {
                                                        rules: [
                                                            {
                                                                message: {message},
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
                                                            message: {message},
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
                                                >{getFieldDecorator("whenoccurred", {
                                                    rules: [
                                                        {
                                                            message: {message},
                                                            type: "array",
                                                            required: false
                                                        }
                                                    ]
                                                })(
                                                    <Cascader
                                                        placeholder="When Occurred"
                                                        options={DomesticViolenceOccurrence}
                                                    ></Cascader>)}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={8}>
                                            <Col span={8}>
                                                <Form.Item
                                                    label="CurrentlyFleeing"
                                                >{getFieldDecorator("currentlyfleeing", {
                                                    rules: [
                                                        {
                                                            message: {message},
                                                            type: "array",
                                                            required: false
                                                        }
                                                    ]
                                                })(<Cascader
                                                        placeholder="Currently Fleeing"
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
                                                    {getFieldDecorator("informationdateDC", {
                                                        rules: [
                                                            {
                                                                message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                                message: {message},
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
                                                    {getFieldDecorator("informationdateCL", {
                                                        rules: [
                                                            {
                                                                message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                                message: {message},
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
                                                                message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                                message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                            message: {message},
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
                                                                message: {message},
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <DatePicker style={{width: "100%"}}/>)}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Panel>
                                    <Panel header="Sexual Orientation" key="12">
                                        <Row gutter={8}>
                                            <Col span={8}>
                                                <Form.Item
                                                    label="SexualOrientation">
                                                    {getFieldDecorator("sexualorientation", {
                                                        rules: [
                                                            {
                                                                message: {message},
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Select.."
                                                            options={SexualOrientationCategory}
                                                        ></Cascader>)}
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    label="Description"
                                                >{getFieldDecorator("description", {
                                                    rules: [
                                                        {
                                                            message: {message},
                                                            required: false
                                                        }
                                                    ]
                                                })(
                                                    <Cascader
                                                        placeholder="Discharge Status"
                                                        options={DischargeStatusCategory}
                                                    ></Cascader>)}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Panel>
                                    <Panel header="Veteran's Information" key="13">
                                        <Row gutter={8}>
                                            <Col span={8}>
                                                <Form.Item
                                                    label="Year Entered Military Service">
                                                    {getFieldDecorator("yearenteredmilitaryservice", {
                                                        rules: [
                                                            {
                                                                message: {message},
                                                                required: true
                                                            }
                                                        ]
                                                    })(
                                                        <Input/>)}
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    label="Year Separated From Military Service"
                                                >{getFieldDecorator("yearseparatedfrommilitaryservice", {
                                                    rules: [
                                                        {
                                                            message: {message},
                                                            required: true
                                                        }
                                                    ]
                                                })(
                                                    <Input/>)}
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    label="TOO: WorldWar2"
                                                >{getFieldDecorator("theatreofoperations_worldwar2", {
                                                    rules: [
                                                        {
                                                            message: {message},
                                                            type: "array",
                                                            required: true
                                                        }
                                                    ]
                                                })(
                                                    <Cascader
                                                        placeholder="Theatre Of Operations: WorldWar2"
                                                        options={ResponseCategory}
                                                    ></Cascader>)}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={8}>
                                            <Col span={8}>
                                                <Form.Item
                                                    label="TOO: KoreanWar"
                                                >{getFieldDecorator("theatreofoperations_koreanwar", {
                                                    rules: [
                                                        {
                                                            message: {message},
                                                            type: "array",
                                                            required: true
                                                        }
                                                    ]
                                                })(<Cascader
                                                        placeholder="Theatre Of Operations: KoreanWar"
                                                        options={ResponseCategory}
                                                    ></Cascader>
                                                )}
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    label="TOO: VietnamWar"
                                                >{getFieldDecorator("theatreofoperations_vietnamwar", {
                                                    rules: [
                                                        {
                                                            message: {message},
                                                            type: "array",
                                                            required: true
                                                        }
                                                    ]
                                                })(
                                                    <Cascader
                                                        placeholder="Theatre Of Operations: VietnamWar"
                                                        options={ResponseCategory}
                                                    ></Cascader>)}
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    label="TOO: PersianGulfWar"
                                                >{getFieldDecorator("theatreofoperations_persiangulfwar", {
                                                    rules: [
                                                        {
                                                            message: {message},
                                                            type: "array",
                                                            required: true
                                                        }
                                                    ]
                                                })(
                                                    <Cascader
                                                        placeholder="Theatre Of Operations: PersianGulfWar"
                                                        options={ResponseCategory}
                                                    ></Cascader>)}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={8}>
                                            <Col span={8}>
                                                <Form.Item
                                                    label="TOO: Afghanistan">
                                                    {getFieldDecorator("theatreofoperations_afghanistan", {
                                                        rules: [
                                                            {
                                                                message: {message},
                                                                type: "array",
                                                                required: true
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Theatre Of Operations: Afghanistan"
                                                            options={ResponseCategory}
                                                        ></Cascader>)}
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    label="TOO: Iraq - IraqiFreedom">
                                                    {getFieldDecorator("theatreofoperations_iraq_iraqifreedom", {
                                                        rules: [
                                                            {
                                                                message: {message},
                                                                type: "array",
                                                                required: true
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Theatre Of Operations: Iraq - IraqiFreedom"
                                                            options={ResponseCategory}
                                                        ></Cascader>)}
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    label="TheatreOfOperations: Iraq - NewDawn">
                                                    {getFieldDecorator("theatreofoperations_iraq_newdawn", {
                                                        rules: [
                                                            {
                                                                message: {message},
                                                                type: "array",
                                                                required: true
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="TheatreOfOperations: Iraq - NewDawn"
                                                            options={ResponseCategory}
                                                        ></Cascader>)}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={8}>
                                            <Col span={8}>
                                                <Form.Item
                                                    label="TOO: Other Peace keeping Operations">
                                                    {getFieldDecorator("theatreofoperations_otherpeacekeepingoperations", {
                                                        rules: [
                                                            {
                                                                message: {message},
                                                                type: "array",
                                                                required: true
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Theatre Of Operations: Other Peace keeping Operations"
                                                            options={ResponseCategory}
                                                        ></Cascader>)}
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    label="Branch Of Military">
                                                    {getFieldDecorator("branchofmilitary", {
                                                        rules: [
                                                            {
                                                                message: {message},
                                                                type: "array",
                                                                required: true
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Branch Of Military"
                                                            options={MilitaryBranchCategory}
                                                        ></Cascader>)}
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    label="Discharge Status">
                                                    {getFieldDecorator("dischargestatus", {
                                                        rules: [
                                                            {
                                                                message: {message},
                                                                type: "array",
                                                                required: true
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Discharge Status"
                                                            options={DischargeStatusCategory}
                                                        ></Cascader>)}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Panel>
                                    <Panel header="ConnectionWithSOAR" key="14">
                                        <Row gutter={8}>
                                            <Col span={16}>
                                                <Form.Item
                                                    label="Connection With SOAR">
                                                    {getFieldDecorator("connectionwithsoar", {
                                                        rules: [
                                                            {
                                                                message: {message},
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Connection With SOAR"
                                                            options={ResponseCategory}
                                                        ></Cascader>)}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Panel>
                                    <Panel header="EmploymentStatus" key="15">
                                        <Row gutter={8}>
                                            <Col span={8}>
                                                <Form.Item
                                                    label="Information Date">
                                                    {getFieldDecorator("informationdate", {
                                                        rules: [
                                                            {
                                                                message: {message},
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <DatePicker style={{width: "100%"}}/>)}
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    label="Employed">
                                                    {getFieldDecorator("employed", {
                                                        rules: [
                                                            {
                                                                message: {message},
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Employed"
                                                            options={YesNoResponse}
                                                        ></Cascader>)}
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    label="Type Of Employment">
                                                    {getFieldDecorator("typeofemployment", {
                                                        rules: [
                                                            {
                                                                message: {message},
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Type Of Employment"
                                                            options={TypeOfEmploymentCategory}
                                                        ></Cascader>)}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={8}>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Why Not Employed">
                                                    {getFieldDecorator("whynotemployed", {
                                                        rules: [
                                                            {
                                                                message: {message},
                                                                type: "array",
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <Cascader
                                                            placeholder="Why Not Employed"
                                                            options={WhyNotEmployedCategory}
                                                        ></Cascader>)}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Panel>
                                    <Panel header="ServicesProvidedSSVF" key="16">
                                        <Row gutter={8}>
                                            <Col span={8}>
                                                <Form.Item
                                                    label="Date Of Service">
                                                    {getFieldDecorator("dateofservice", {
                                                        rules: [
                                                            {
                                                                message: {message},
                                                                required: false
                                                            }
                                                        ]
                                                    })(
                                                        <DatePicker style={{width: "100%"}}/>)}
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    label="Type Of Service"
                                                >{getFieldDecorator("typeofservice", {
                                                    rules: [
                                                        {
                                                            message: {message},
                                                            type: "array",
                                                            required: false
                                                        }
                                                    ]
                                                })(
                                                    <Cascader
                                                        placeholder="Type Of Service"
                                                        options={TypeOfServiceCategory}
                                                    ></Cascader>)}
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    label="If Assistance Obtaining VA Benefits"
                                                >{getFieldDecorator("ifassistanceobtainingvabenefits", {
                                                    rules: [
                                                        {
                                                            message: {message},
                                                            type: "array",
                                                            required: false
                                                        }
                                                    ]
                                                })(
                                                    <Cascader
                                                        placeholder="If Assistance Obtaining VA Benefits"
                                                        options={IfAssistanceObtainingVABenefitsCategory}
                                                    ></Cascader>)}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={8}>
                                            <Col span={8}>
                                                <Form.Item
                                                    label="If Assistance Obtaining Or Coordinating Other Public Benefits"
                                                >{getFieldDecorator("ifassistanceobtainingorcoordinatingotherpublicbenefits", {
                                                    rules: [
                                                        {
                                                            message: {message},
                                                            type: "array",
                                                            required: false
                                                        }
                                                    ]
                                                })(<Cascader
                                                        placeholder="If Assistance Obtaining Or Coordinating Other Public Benefits"
                                                        options={IfAssistanceObtainingOrCoordinatingOtherPublicBenefitsCategory}
                                                    ></Cascader>
                                                )}
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    label="If Direct Provision Of Other Public Benefits"
                                                >{getFieldDecorator("ifdirectprovisionofotherpublicbenefits", {
                                                    rules: [
                                                        {
                                                            message: {message},
                                                            type: "array",
                                                            required: false
                                                        }
                                                    ]
                                                })(
                                                    <Cascader
                                                        placeholder="If Direct Provision Of Other Public Benefits"
                                                        options={IfDirectProvisionOfOtherPublicBenefitsCategory}
                                                    ></Cascader>)}
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    label="If Other Supportive Service Approved By VA"
                                                >{getFieldDecorator("ifothersupportiveserviceapprovedbyva", {
                                                    rules: [
                                                        {
                                                            message: {message},
                                                            required: false
                                                        }
                                                    ]
                                                })(
                                                    <Input/>)}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Panel>
                                    <Panel style={{backgroundColor: "lightseagreen"}} header="Submit Form Here" key="17">
                                        <Row>
                                            <Col span={12}>
                                                <p style={{padding: "2%"}}>


                                                    <Checkbox>
                                                        I acknowledge, the form is completed as per the inputs provided
                                                        by the
                                                        client.
                                                    </Checkbox>

                                                </p>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item>
                                                    <Button type="primary" block htmlType="submit"
                                                            className="registration-submit-button">
                                                        Submit
                                                    </Button>
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                    </Panel>
                                </Collapse>
                            </Form>
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
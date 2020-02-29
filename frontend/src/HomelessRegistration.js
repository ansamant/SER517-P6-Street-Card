import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import {
  Form,
  Input,
  Cascader,
  Select,
  Button,
  AutoComplete,
  DatePicker,
  notification,
  Icon
} from "antd";
import Header from "./Header";
import moment from 'moment';
import StreetCardFooter from './StreetCardFooter'

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;


const nameDataQuality = [
  {
    value: 1,
    label: "Full Name Reported"
  },
  {
    value: 2,
    label: "Partial Name Reported"
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

const SSNDataQuality = [
  {
    value: 1,
    label: "Full SSN Reported"
  },
  {
    value: 2,
    label: "Partial SSN Reported"
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

const DOBDataQuality = [
  {
    value: 1,
    label: "Full DOB Reported"
  },
  {
    value: 2,
    label: "Partial DOB Reported"
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

const Race = [
  {
    value: 1,
    label: "American India or Alaskan Native"
  },
  {
    value: 2,
    label: "Asian"
  },
  {
    value: 3,
    label: "Black or African American"
  },
  {
    value: 4,
    label: "Native Hawaiian or Pacific Islander"
  },
  {
    value: 5,
    label: "White"
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

const Ethnicity = [
  {
    value: 0,
    label: "Non Hispanic/Non Latino"
  },
  {
    value: 1,
    label: "Hispanic/Latino"
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

const Gender = [
  {
    value: 0,
    label: "Female"
  },
  {
    value: 1,
    label: "Male"
  },
  {
    value: 3,
    label: "Trans Femal"
  },
  {
    value: 4,
    label: "Trans Male"
  },
  {
    value: 5,
    label: "Gender Non-Conforming"
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

const VeteranStatus = [
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


class homelessRegistration extends React.Component {

  constructor(props) {
    super(props);
    console.log("this.props.homelessPersonId ",this.props.homelessPersonId );
    this.handleHomelessPersonRegistrationSubmit = this.handleHomelessPersonRegistrationSubmit.bind(this);
    this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);
    this.handleHomelessPersonUpdateRegistrationSubmit = this.handleHomelessPersonUpdateRegistrationSubmit.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
  }

  
state = {
		  confirmDirty: false,
		  autoCompleteResult: []
		};

componentDidMount() {
    console.log("homelessPersonId",this.props.homelessPersonId);

    if (this.props.homelessPersonId) {
        console.log("homelessPersonId",this.props.homelessPersonId);
        fetch('http://localhost:8000/homeless/'+ this.props.homelessPersonId + '/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(res => res.json())
          .then(json => {
            
            this.setState({
             homelessData : json
           });
          });
      }else{
        console.log("homelessPersonId",this.props.homelessPersonId);
        this.setState({
             homelessData : {}
           });
      }

  }
  handleSuccessfulLogoutAction() {
    this.props.handleLogout();
    this.props.history.push('/login');
  }

  

  handleHomelessPersonRegistrationSubmit = e => {
      e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {

      if (!err) {
        var registerRequestObject = {};
        //registerRequestObject.PersonalId = this.state.homelessData.PersonalId ? this.state.homelessData.PersonalId : Math.floor(100000 + Math.random() * 900000);
        registerRequestObject.FirstName =  values.FirstName ? values.FirstName : null;
        registerRequestObject.MiddleName = values.MiddleName ? values.MiddleName : null;
        registerRequestObject.LastName = values.LastName ? values.LastName : null;
        registerRequestObject.NameSuffix = values.NameSuffix ? values.NameSuffix : null;
        registerRequestObject.NameDataQuality = values.NameDataQuality[0];
        registerRequestObject.SSN = values.SSN ? values.SSN : null;
        registerRequestObject.SSNDataQuality = values.SSNDataQuality[0];
        registerRequestObject.DOB = values['DOB'] ? values['DOB'].format('YYYY-MM-DD') : null;
        registerRequestObject.DOBDataQuality = values.DOBDataQuality[0];
        registerRequestObject.Race = values.Race[0];
        registerRequestObject.Ethnicity = values.Ethnicity[0];
        registerRequestObject.Gender = values.Gender[0];
        registerRequestObject.VeteranStatus = values.VeteranStatus[0];

        console.log(registerRequestObject);

        fetch('http://localhost:8000/homeless/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(registerRequestObject)
        })
          .then(res => res.json())
          .then(json => {
          	this.props.handleHomelessPersonId(registerRequestObject.PersonalId);
            this.props.history.push('/socialWorkerRegister');
          });
      }
    });
  }


  

  handleHomelessPersonUpdateRegistrationSubmit = e => {
      e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {

      if (!err) {

        var registerRequestObject = {};
        //registerRequestObject.PersonalId = Number(this.state.homelessData.PersonalId);
        registerRequestObject.FirstName =  values.FirstName ? values.FirstName : null;
        registerRequestObject.MiddleName = values.MiddleName ? values.MiddleName : null;
        registerRequestObject.LastName = values.LastName ? values.LastName : null;
        registerRequestObject.NameSuffix = values.NameSuffix ? values.NameSuffix : null;
        registerRequestObject.NameDataQuality = values.NameDataQuality[0];
        registerRequestObject.SSN = values.SSN ? values.SSN : null;
        registerRequestObject.SSNDataQuality = values.SSNDataQuality[0];
        registerRequestObject.DOB = values['DOB'] ? values['DOB'].format('YYYY-MM-DD') : null;
        registerRequestObject.DOBDataQuality = values.DOBDataQuality[0];
        registerRequestObject.Race = values.Race[0];
        registerRequestObject.Ethnicity = values.Ethnicity[0];
        registerRequestObject.Gender = values.Gender[0];
        registerRequestObject.VeteranStatus = values.VeteranStatus[0];

        console.log(registerRequestObject);

        fetch('http://localhost:8000/homeless/' + this.state.homelessData.PersonalId + '/', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(registerRequestObject)
        })
          .then(res => res.json())
          .then(json => {
          	this.props.handleHomelessPersonId(registerRequestObject.PersonalId);
            this.props.history.push('/socialWorkerRegister');
          });
      }
    });
  }

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  isEmpty(obj){
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    if(!this.isEmpty(this.state.homelessData)){
      console.log("inside run",this.state.homelessData);
    	return (
      <div>
      <Header 
        handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
        loggedInStatus={this.state.loggedInStatus}
      />

        <Form {...formItemLayout} onSubmit={this.handleHomelessPersonUpdateRegistrationSubmit} className="registration-form ">
          <h1>Register Client</h1>
        <Form.Item>
          {getFieldDecorator("FirstName", {
          	initialValue: this.state.homelessData.FirstName ? this.state.homelessData.FirstName : '',
            rules: [
              {
                required: false,
                message: "Please input your First Name!",
                whitespace: true
              }
            ]
          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("MiddleName", {
          	initialValue: this.state.homelessData.MiddleName ? this.state.homelessData.MiddleName : '',
            rules: [
              {
                required: false,
                message: "Please input your Middle Name!",
                whitespace: true
              }
            ]
          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Middle Name" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("LastName", {
          	initialValue: this.state.homelessData.LastName ? this.state.homelessData.LastName : '',
            rules: [
              {
                required: false,
                message: "Please input your Last Name!",
                whitespace: true
              }
            ]
          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name"/>)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("NameSuffix", {
          	initialValue: this.state.homelessData.NameSuffix ? this.state.homelessData.NameSuffix : '',
            rules: [
              {
                required: false,
                message: "Please input your Name Suffix!",
                whitespace: true
              }
            ]
          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name Suffix" />)}
        </Form.Item>
        <Form.Item label="">
          {getFieldDecorator("NameDataQuality", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select Quality level of Name Data!"
              }
            ]
          })(<Cascader options={nameDataQuality}  placeholder="Name Quality" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("SSN", {
          	initialValue: this.state.homelessData.SSN ? this.state.homelessData.LastName : '',
            rules: [
              {
                required: false,
                message: "Please input your SSN!",
                whitespace: true
              }
            ]
          })(<Input placeholder="SSN" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("SSNDataQuality", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select Quality level of SSN Data!"
              }
            ]
          })(<Cascader options={SSNDataQuality} placeholder="SSN Quality"/>)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('DOB', {
          	initialValue: this.state.homelessData.DOB ? moment(this.state.homelessData.DOB, 'YYYY/MM/DD') : moment("1993-06-28", 'YYYY/MM/DD'),
          	rules: [
              {
              	type: "object",
                required: false,
                message: "Please input your DOB!"
              }
            ]
          })(<DatePicker/>)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("DOBDataQuality", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select Quality level of DOB Data!"
              }
            ]
          })(<Cascader options={DOBDataQuality} placeholder="DOB Quality" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("Race", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select your Race!"
              }
            ]
          })(<Cascader options={Race} placeholder="Race"/>)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("Ethnicity", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select your Ethnicity!"
              }
            ]
          })(<Cascader options={Ethnicity} placeholder="Ethnicity" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("Gender", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select your Gender!"
              }
            ]
          })(<Cascader options={Gender} placeholder="Gender" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("VeteranStatus", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select your Veteran Status!"
              }
            ]
          })(<Cascader options={VeteranStatus} placeholder="Veteran Status"/>)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" className="registration-submit-button">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <StreetCardFooter/>
      </div>
    );
    }else{
    	return (
      <div>
      <Header 
        handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
        loggedInStatus={this.state.loggedInStatus}
      />

        <Form {...formItemLayout} onSubmit={this.handleHomelessPersonRegistrationSubmit} className="registration-form ">
          <h1>Register Client</h1>
        <Form.Item>
          {getFieldDecorator("FirstName", {
            rules: [
              {
                required: false,
                message: "Please input your First Name!",
                whitespace: true
              }
            ]
          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("MiddleName", {
            rules: [
              {
                required: false,
                message: "Please input your Middle Name!",
                whitespace: true
              }
            ]
          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Middle Name" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("LastName", {
            rules: [
              {
                required: false,
                message: "Please input your Last Name!",
                whitespace: true
              }
            ]
          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name"/>)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("NameSuffix", {
            rules: [
              {
                required: false,
                message: "Please input your Name Suffix!",
                whitespace: true
              }
            ]
          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name Suffix" />)}
        </Form.Item>
        <Form.Item label="">
          {getFieldDecorator("NameDataQuality", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select Quality level of Name Data!"
              }
            ]
          })(<Cascader options={nameDataQuality}  placeholder="Name Quality" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("SSN", {
            rules: [
              {
                required: false,
                message: "Please input your SSN!",
                whitespace: true
              }
            ]
          })(<Input placeholder="SSN" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("SSNDataQuality", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select Quality level of SSN Data!"
              }
            ]
          })(<Cascader options={SSNDataQuality} placeholder="SSN Quality"/>)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('DOB', {
            rules: [
              {
                type: "object",
                required: false,
                message: "Please input your DOB!"
              }
            ]
          })(<DatePicker/>)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("DOBDataQuality", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select Quality level of DOB Data!"
              }
            ]
          })(<Cascader options={DOBDataQuality} placeholder="DOB Quality" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("Race", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select your Race!"
              }
            ]
          })(<Cascader options={Race} placeholder="Race"/>)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("Ethnicity", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select your Ethnicity!"
              }
            ]
          })(<Cascader options={Ethnicity} placeholder="Ethnicity" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("Gender", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select your Gender!"
              }
            ]
          })(<Cascader options={Gender} placeholder="Gender" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("VeteranStatus", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select your Veteran Status!"
              }
            ]
          })(<Cascader options={VeteranStatus} placeholder="Veteran Status"/>)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" className="registration-submit-button">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <StreetCardFooter/>
      </div>
    );
    }
    
  }
}

const WrappedhomelessRegistration = Form.create({ name: "register" })(
  homelessRegistration
);

export default WrappedhomelessRegistration;

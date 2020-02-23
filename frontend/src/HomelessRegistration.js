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
  notification
} from "antd";
import Header from "./Header";
import moment from 'moment';

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
    console.log(this.props.username)
    console.log(this.props.homelessData)
    this.handleHomelessPersonRegistrationSubmit = this.handleHomelessPersonRegistrationSubmit.bind(this);
    this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);
  }

  
state = {
		  confirmDirty: false,
		  autoCompleteResult: []
		};

componentDidMount() {
    this.setState({
              FirstName: this.props.homelessData ? this.props.homelessData.FirstName : ''
            });
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
        registerRequestObject.PersonalId = this.props.homelessData.PersonalId ? this.props.homelessData.PersonalId : Math.floor(100000 + Math.random() * 900000);
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


  

  handleHomelessPersonRegistrationSubmit = e => {
      e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {

      if (!err) {

        var registerRequestObject = {};
        registerRequestObject.PersonalId = this.props.homelessData.PersonalId ? Number(this.props.homelessData.PersonalId) : Math.floor(100000 + Math.random() * 900000);
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

    if(this.props.homelessData){
    	return (
      <div>
      <Header 
        handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
        loggedInStatus={this.state.loggedInStatus}
      />

        <Form {...formItemLayout} onSubmit={this.handleHomelessPersonRegistrationSubmit} className="registration-form ">
          <h1>Fill the details of Homeless Person registration:</h1>
        <Form.Item label="First Name">
          {getFieldDecorator("FirstName", {
          	initialValue: this.props.homelessData.FirstName ? this.props.homelessData.FirstName : '',
            rules: [
              {
                required: false,
                message: "Please input your First Name!",
                whitespace: true
              }
            ]
          })(<Input/>)}
        </Form.Item>
        <Form.Item label="Middle Name">
          {getFieldDecorator("MiddleName", {
          	initialValue: this.props.homelessData.MiddleName ? this.props.homelessData.MiddleName : '',
            rules: [
              {
                required: false,
                message: "Please input your Middle Name!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Last Name">
          {getFieldDecorator("LastName", {
          	initialValue: this.props.homelessData.LastName ? this.props.homelessData.LastName : '',
            rules: [
              {
                required: false,
                message: "Please input your Last Name!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Name Suffix">
          {getFieldDecorator("NameSuffix", {
          	initialValue: this.props.homelessData.NameSuffix ? this.props.homelessData.NameSuffix : '',
            rules: [
              {
                required: false,
                message: "Please input your Name Suffix!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Name Data Quality">
          {getFieldDecorator("NameDataQuality", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select Quality level of Name Data!"
              }
            ]
          })(<Cascader options={nameDataQuality} />)}
        </Form.Item>
        <Form.Item label="Social Security Number (SSN)">
          {getFieldDecorator("SSN", {
          	initialValue: this.props.homelessData.SSN ? this.props.homelessData.LastName : '',
            rules: [
              {
                required: false,
                message: "Please input your SSN!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="SSN Data Quality">
          {getFieldDecorator("SSNDataQuality", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select Quality level of SSN Data!"
              }
            ]
          })(<Cascader options={SSNDataQuality} />)}
        </Form.Item>
        <Form.Item label="Date Of Birth">
          {getFieldDecorator('DOB', {
          	initialValue: this.props.homelessData.DOB ? moment(this.props.homelessData.DOB, 'YYYY/MM/DD') : moment("1993-06-28", 'YYYY/MM/DD'),
          	rules: [
              {
              	type: "object",
                required: false,
                message: "Please input your DOB!"
              }
            ]
          })(<DatePicker/>)}
        </Form.Item>
        <Form.Item label="DOB Data Quality">
          {getFieldDecorator("DOBDataQuality", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select Quality level of DOB Data!"
              }
            ]
          })(<Cascader options={DOBDataQuality} />)}
        </Form.Item>
        <Form.Item label="Race">
          {getFieldDecorator("Race", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select your Race!"
              }
            ]
          })(<Cascader options={Race} />)}
        </Form.Item>
        <Form.Item label="Ethnicity">
          {getFieldDecorator("Ethnicity", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select your Ethnicity!"
              }
            ]
          })(<Cascader options={Ethnicity} />)}
        </Form.Item>
        <Form.Item label="Gender New">
          {getFieldDecorator("Gender", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select your Gender!"
              }
            ]
          })(<Cascader options={Gender} />)}
        </Form.Item>
        <Form.Item label="Veteran Status">
          {getFieldDecorator("VeteranStatus", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select your Veteran Status!"
              }
            ]
          })(<Cascader options={VeteranStatus} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
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
          <h1>Fill the details of Homeless Person registration:</h1>
        <Form.Item label="First Name">
          {getFieldDecorator("FirstName", {
            rules: [
              {
                required: false,
                message: "Please input your First Name!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Middle Name">
          {getFieldDecorator("MiddleName", {
            rules: [
              {
                required: false,
                message: "Please input your Middle Name!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Last Name">
          {getFieldDecorator("LastName", {
            rules: [
              {
                required: false,
                message: "Please input your Last Name!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Name Suffix">
          {getFieldDecorator("NameSuffix", {
            rules: [
              {
                required: false,
                message: "Please input your Name Suffix!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Name Data Quality">
          {getFieldDecorator("NameDataQuality", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select Quality level of Name Data!"
              }
            ]
          })(<Cascader options={nameDataQuality} />)}
        </Form.Item>
        <Form.Item label="Social Security Number (SSN)">
          {getFieldDecorator("SSN", {
            rules: [
              {
                required: false,
                message: "Please input your SSN!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="SSN Data Quality">
          {getFieldDecorator("SSNDataQuality", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select Quality level of SSN Data!"
              }
            ]
          })(<Cascader options={SSNDataQuality} />)}
        </Form.Item>
        <Form.Item label="Date Of Birth">
          {getFieldDecorator('DOB', {
          	rules: [
              {
              	type: "object",
                required: false,
                message: "Please input your DOB!"
              }
            ]
          })(<DatePicker />)}
        </Form.Item>
        <Form.Item label="DOB Data Quality">
          {getFieldDecorator("DOBDataQuality", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select Quality level of DOB Data!"
              }
            ]
          })(<Cascader options={DOBDataQuality} />)}
        </Form.Item>
        <Form.Item label="Race">
          {getFieldDecorator("Race", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select your Race!"
              }
            ]
          })(<Cascader options={Race} />)}
        </Form.Item>
        <Form.Item label="Ethnicity">
          {getFieldDecorator("Ethnicity", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select your Ethnicity!"
              }
            ]
          })(<Cascader options={Ethnicity} />)}
        </Form.Item>
        <Form.Item label="Gender">
          {getFieldDecorator("Gender", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select your Gender!"
              }
            ]
          })(<Cascader options={Gender} />)}
        </Form.Item>
        <Form.Item label="Veteran Status">
          {getFieldDecorator("VeteranStatus", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select your Veteran Status!"
              }
            ]
          })(<Cascader options={VeteranStatus} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </div>
    );
    }
    
  }
}

const WrappedhomelessRegistration = Form.create({ name: "register" })(
  homelessRegistration
);

export default WrappedhomelessRegistration;

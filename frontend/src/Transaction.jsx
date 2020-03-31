import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {Form, Layout} from "antd";
import Header from './Header'
import StreetCardFooter from './StreetCardFooter'
import SiderComponent from './component/SiderComponent';

const {Content} = Layout;

class Transaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transaction: {},
            isLoaded: false,
        }
        this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);
        this.setPagecomponent = this.setPagecomponent.bind(this);
    }

    componentDidMount() {
    }

    handleSuccessfulLogoutAction() {
        this.props.handleLogout();
        this.props.history.push('/login');
    }

    setPagecomponent(pageComponentValue) {
        this.props.updatePageComponent(pageComponentValue)
        this.props.history.push('/socialWorkerRegister');
    };

    // handleInventory = e => {
    //     e.preventDefault();
    //     this.props.form.validateFieldsAndScroll((err, values) => {
    //
    //         var transactionObject = {};
    //         employmentStatusObject.InformationDate = values['informationdate'] != null ? values['informationdate'].format('YYYY-MM-DD') : null;
    //         employmentStatusObject.Employed = this.handleValue(values.employed)
    //         employmentStatusObject.TypeOfEmployment = this.handleValue(values.typeofemployment)
    //         employmentStatusObject.WhyNotEmployed = this.handleValue(values.whynotemployed)
    //         enrollmentRequestObject.employment_Status = employmentStatusObject;
    //         this.handleEmptyObject(enrollmentRequestObject);
    //         console.log(enrollmentRequestObject);
    //
    //         fetch('http://localhost:8000/homeless/' + this.props.homelessPersonId + '/transaction/', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${localStorage.getItem('token')}`
    //             },
    //             body: JSON.stringify(transactionObject)
    //         })
    //             .then(res => res.json())
    //             .then(json => {
    //                 this.props.history.push('/socialWorkerRegister');
    //             });
    //
    //     });
    // };

    render() {
        console.log(this.props.homelessPersonId)
        return (
            <Layout className="layout">
                <Header
                    handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                    loggedInStatus={this.props.loggedInStatus}/>
                <Layout>
                    <Content className="content-enroll">
                        <div className="site-layout-content-homeless">

                        </div>
                    </Content>
                </Layout>
                <StreetCardFooter/>
            </Layout>
        );
    }
}

const WrappedTransaction = Form.create({name: 'time_related_controls'})(Transaction);


export default WrappedTransaction;
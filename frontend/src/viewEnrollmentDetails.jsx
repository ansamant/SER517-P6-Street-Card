import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {Collapse, Form, Layout, Spin} from "antd";
import Header from './Header'
import StreetCardFooter from './StreetCardFooter'
import SiderComponent from './SiderComponent';

const {Content} = Layout;
const {Panel} = Collapse;

class ViewEnrollmentDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enrollment: {},
            isLoaded: false,
        }
        this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);
        this.setPagecomponent = this.setPagecomponent.bind(this);

    }

    componentDidMount() {
        fetch(process.env.REACT_APP_IP + 'homeless/' + this.props.homelessPersonId + '/enrollment/' + this.props.enrollmentId + '/', {
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
                                enrollment: json,
                                isLoaded: true
                            }
                        )
                    })
                } else if (Math.round(res.status / 100) == 4) {
                    if (window.confirm("Error, invalid personal id: " + (res.status).toString())) {
                        this.props.history.push('/socialWorkerRegister');
                    } else {
                        this.props.history.push('/socialWorkerRegister');
                    }
                } else if (Math.round(res.status / 100) == 5) {
                    if (window.confirm("Server Error: " + (res.status).toString())) {
                        this.props.history.push('/socialWorkerRegister');
                    } else {
                        this.props.history.push('/socialWorkerRegister');
                    }
                }
            })
    }

    handleSuccessfulLogoutAction() {
        this.props.handleLogout();
        this.props.history.push('/login');
    }

    setPagecomponent(pageComponentValue) {
        this.props.updatePageComponent(pageComponentValue)
        this.props.history.push('/socialWorkerRegister');
    };

    render() {
        const {enrollment} = this.state;
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const config = {
            rules: [{type: 'object', required: true, message: 'Please select time!'}],
        };

        const enrollMainDetails = []
        const enrollPanel = []

        for (const key in enrollment) {
            if (typeof (enrollment[key]) === 'object') {
                const eVal = []
                for (const x in enrollment[key]) {
                    eVal.push(<p>{x} : {enrollment[key][x]}</p>);
                }
                enrollPanel.push(<Panel header={key} key={key}>{eVal}</Panel>)
            } else {
                enrollMainDetails.push(<p> {key} : {enrollment[key]} </p>)
            }

        }

        if (this.state.isLoaded) {
            return (
                <Layout className="layout">
                    <Header
                        handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                        loggedInStatus={this.props.loggedInStatus}/>
                    <Layout>
                        <SiderComponent
                            setPagecomponent={this.setPagecomponent}
                        />

                        <Content className="content-enroll">
                            <div className="site-layout-content-homeless">
                                <Form {...formItemLayout} name="enrollment">
                                    <Collapse style={{backgroundColor: "#f0f9ff"}}>
                                        <Panel key="1" header="Enrollment Details">
                                            {enrollMainDetails}
                                        </Panel>
                                        {enrollPanel}
                                    </Collapse>
                                </Form>
                            </div>
                        </Content>

                    </Layout>
                    <StreetCardFooter/>
                </Layout>
            );
        } else {
            return (
                <Layout className="layout">
                    <Header
                        handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                        loggedInStatus={this.props.loggedInStatus}/>
                    <Layout>
                        <SiderComponent
                            setPagecomponent={this.setPagecomponent}
                        />

                        <Content className="content-login">
                            <div className="site-layout-content-login">
                                <span>Loading . . .<Spin size="small"/></span>

                            </div>
                        </Content>

                    </Layout>
                    <StreetCardFooter/>
                </Layout>
            );
        }


    }
}

const WrappedViewEnrollmentDetails = Form.create({name: 'time_related_controls'})(ViewEnrollmentDetails);


export default WrappedViewEnrollmentDetails;
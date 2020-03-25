import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import {Button, Cascader, Checkbox, Col, Collapse, DatePicker, Form, Input, Layout, Menu, Row, Select} from "antd";
import Header from '../Header'
import StreetCardFooter from '../StreetCardFooter'

const {Content, Sider} = Layout;
const {Panel} = Collapse;

class ViewEnrollmentDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enrollment: {},
            isLoaded: false,
        }
        this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);

    }

    componentDidMount() {
        fetch('http://127.0.0.1:8000/homeless/' + this.props.homelessPersonId + '/enrollment/' + this.props.enrollmentId + '/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                // json = this.modifyJSON(json)
                this.setState({
                        enrollment: json,
                    }
                )

            })
    }

    modifyJSON = temp => {
        [temp].map(obj => {
            const objKeys = Object.keys(obj);
            return objKeys.map(itemKey => {
              return {
                itemKey,
                itemValue: obj[itemKey]
              };
            });
          });
    }

    handleSuccessfulLogoutAction() {
        this.props.handleLogout();
        this.props.history.push('/login');
    }

    handleClick = e => {
        if (e.key === '3') {
            this.props.updatePageComponent('newAppointMent')
            this.props.history.push('/socialWorkerRegister');
        } else if (e.key === '4') {
            this.props.updatePageComponent('viewAppointment')
            this.props.history.push('/socialWorkerRegister');
        } else if (e.key === '1') {
            this.props.updatePageComponent('registerClient')
            this.props.history.push('/socialWorkerRegister');
        } else if (e.key === '2') {
            this.props.updatePageComponent('updateInformation')
            this.props.history.push('/socialWorkerRegister');
        } else if (e.key === '5') {
            this.props.updatePageComponent('loginfo')
            this.props.history.push('/socialWorkerRegister');
        } else if (e.key === '6') {
            this.props.updatePageComponent('projectenroll')
            this.props.history.push('/enrollment');
        } else if (e.key === '7') {
            this.props.updatePageComponent('viewenrollment')
            this.props.history.push('/viewAllEnrollment');
        }
    };

    // renderDynamicElWrapper() {
    //     return this.state.opportunityDetails.map(items => {
    //       return (
    //         <Row type="flex" justify="space-around">
    //           {this.renderDynamicEl(items)}
    //         </Row>
    //       );
    //     });
    //    };

    // renderDynamicEl(els) {
    //     return els.map(el => {
    //       return (
    //         <Col span={10}>
    //           <Form.Item label={el.itemKey}>
    //             <Input placeholder={el.itemValue} />
    //           </Form.Item>
    //         </Col>
    //       );
    //     });
    //   };

    // mapping = enrollment1 => {
    //     enrollment1.map(obj => {
    //         const objKeys = Object.keys(obj);
    //         return objKeys.map(itemKey => {
    //           return {
    //             itemKey,
    //             itemValue: obj[itemKey]
    //           };
    //         });
    //       });
    //   };

    render() {
        const {enrollment} = this.state;
        console.log(enrollment)
        // this.mapping(enrollment)
        // const {enrollment1} = enrollment.employment_Status;
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
        return (
            <Layout className="layout">
                <Header
                    handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                    loggedInStatus={this.props.loggedInStatus}
                />
                <Layout>
                    <Sider className="site-layout-sider"
                    >
                        <Menu
                            style={{borderRight: '0px', backgroundColor: '#173e43'}}
                            mode="inline" defaultSelectedKeys={['5']}
                            onClick={this.handleClick}
                        >
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
                            <Menu.Item style={{marginTop: '20px', color: '#fae596'}} key="7">
                                <span>View Enrollment</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    {
                        Object.keys(enrollment).map((sections, mapRequiredKey) => {
                        let sectionPeople = enrollment[sections];
                        return(

                                <Content className="content">
                                {
                                    (typeof enrollment[sections] === 'object')
                                    ?
                                        Object.keys(sectionPeople).map((person, personId) => {
                                        console.log(person)
                                        return(
                                            <div>
                                                {person}: {sectionPeople[person]}
                                            </div>
                                            );
                                    })
                                    :
                                    <div>{sections}: {sectionPeople}</div>

                                }
                               </Content>
                            );
                    })
                    }
                </Layout>
                <StreetCardFooter/>
            </Layout>
        );
    }
}

const WrappedViewEnrollmentDetails = Form.create({name: 'time_related_controls'})(ViewEnrollmentDetails);


export default WrappedViewEnrollmentDetails;
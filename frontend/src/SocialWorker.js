import React from 'react';
import 'antd/dist/antd.css';
import './index.css';

class SocialWorker extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.username);
        if (this.props.loggedInStatus === "LOGGED_IN" && this.props.username !== "shivamverma") {
            var localClearanceLevel = '';
            var localserviceProvider = '';
            fetch('http://localhost:8000/user/' + this.props.username + '/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(json => {
                    localClearanceLevel = json.user.socialWorker.clearanceLevel;
                    localserviceProvider = json.user.socialWorker.serviceProvider;
                    this.setState({
                        clearanceLevel: localClearanceLevel,
                        serviceProvider: localserviceProvider
                    });
                    this.props.method(this.state.clearanceLevel, this.state.serviceProvider);
                    if (this.state.clearanceLevel == "caseworker") {
                        this.props.history.push('/socialWorkerRegister');
                    } else if (this.state.clearanceLevel == "client") {
                        this.props.history.push('/clientLanding');
                    } else if (this.state.clearanceLevel == "service_provider_emp") {
                        this.props.history.push('/serviceProvider');
                    } else {
                        this.props.history.push('/greeter');
                    }
                });
        } else {
            this.props.history.push('/socialWorkerRegister');
        }
    }


    render() {
        return (<div></div>);
    }
}


export default SocialWorker;

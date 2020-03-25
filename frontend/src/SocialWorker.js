import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Input, Button} from 'antd';
import Header from './HeaderCommon.js'
import StreetCardFooter from './StreetCardFooter'

class SocialWorker extends React.Component{


  constructor(props) {
    super(props);
  }
  

 componentDidMount() {
 	console.log(this.props.username);
 	if(this.props.loggedInStatus === "LOGGED_IN" && this.props.username !== "shivamverma"){
     var localClearanceLevel = '';
     var localserviceProvider = '';
     fetch('http://localhost:8000/user/' + this.props.username + '/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(res => res.json())
          .then(json => {
            console.log("something", json);
          localClearanceLevel = json.user.socialWorker.clearanceLevel;
          localserviceProvider = json.user.socialWorker.serviceProvider;
          console.log(localClearanceLevel,localserviceProvider);
          this.setState({
              clearanceLevel: localClearanceLevel,
              serviceProvider: localserviceProvider
            });
          this.props.method(this.state.clearanceLevel,this.state.serviceProvider);
          if(this.state.clearanceLevel == "caseworker"){
          	 this.props.history.push('/socialWorkerRegister');
          }else if(this.state.clearanceLevel == "client"){
              this.props.history.push('/clientInfo');
          }
          else{
          	 this.props.history.push('/greeter');
          }
         
      });
    }else{
    	this.props.history.push('/socialWorkerRegister');
    }
  }
  
  

    render(){
       
       return(<div></div>);
       
        
    }
}




  
  export default SocialWorker;

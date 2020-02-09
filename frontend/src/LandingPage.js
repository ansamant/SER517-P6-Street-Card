import React from "react";
import Header from "./Header"
import LocationMap from "./LocationMap"

export default class LandingPage extends React.Component {
  

  render() {
    return (
      <div>
      <Header/>,
      <div><LocationMap className ="location-map"/></div>
    
      </div>
    );
  }
} 
import React, { Component } from 'react';
import {GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './CurrentLocation.js'



export class LocationMap extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >
        <Marker onClick={this.onMarkerClick} name={'current location'} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
        </InfoWindow>
      </CurrentLocation>
    );
  }
}
//console.log("ENV", process.env.REACT_APP_KEY)
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_KEY
})(LocationMap);
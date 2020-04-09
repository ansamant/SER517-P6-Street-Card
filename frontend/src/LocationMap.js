import React, { Component } from 'react';
import {GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './CurrentLocation.js'


const Listing = ({ places }) => (
  <ul>{places && places.map(p => <li key={p.id}>{p.name}</li>)}</ul>
);

export class LocationMap extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    places: []
  };

  onMapReady = (mapProps, map) => this.searchNearby(map, map.center);

  searchNearby = (map, center) => {
    const { google } = this.props;

    const service = new google.maps.places.PlacesService(map);

    // Specify location, radius and place types for your Places API search.
    const request = {
      location: center,
      radius: '5000',
      name: 'social service organization' 
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK)
        this.setState({ places: results });
    });

    console.log("PLACES", this.state.places)
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
        onReady={this.onMapReady}     
      >
        <Marker onClick={this.onMarkerClick} name={'current location'} />
        <Listing places={this.state.places} />
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
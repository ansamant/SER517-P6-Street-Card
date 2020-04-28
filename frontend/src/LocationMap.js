/***
 *
 * Renders current location on the map along with nearby location markers.
 * NOTE: This along with LocationMap.js needs severe code cleaning.
 * Intermediate proficiency with React library needed.
 * Suggested Changes:
 * Add routes
 * Put place Names also in the marker
 * Display currentlocation marker (disappears when other locations populate).
 * references used: https://developers.google.com/maps/documentation/javascript/examples/place-search
 *                  https://dev.to/jessicabetts/how-to-use-google-maps-api-and-react-js-26c2
 *                  https://github.com/fullstackreact/google-maps-react/blob/master/examples/components/places.js
 *                  https://blog.vanila.io/writing-a-google-maps-react-component-fae411588a91
 * @author: Akash Kadam, Aditya Samant
 * @version: 1.0
 */

import React, {Component} from 'react';
import {GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';
import CurrentLocation from './CurrentLocation.js'

/*
const Listing = ({ places }) => (
  <ul>{places && places.map(p => <li key={p.id}>{p.name}</li>)}</ul>
);*/

export class LocationMap extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},

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
                className="map"
                google={this.props.google}
                //displayPlaces={this.displayPlaces}
            >
                <Marker onClick={this.onMarkerClick} name={'current location'}/>

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
            </CurrentLocation>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_KEY
})(LocationMap);
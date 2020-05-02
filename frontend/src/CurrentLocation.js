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

import React from 'react';
import ReactDOM from 'react-dom';


const mapStyles = {
    map: {
        position: 'absolute',
        width: '100%',
        height: '84vh',
        border: '50px solid #0f4d92',
    }
};

export class CurrentLocation extends React.Component {

    constructor(props) {
        super(props);
        const {lat, lng} = this.props.initialCenter;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            },
            places: [],
            aMap: null
        };

        this.searchNearby = this.searchNearby.bind(this);
        this.createMarker = this.createMarker.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
    }

    recenterMap() {
        const map = this.map;
        const current = this.state.currentLocation;

        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let center = new maps.LatLng(current.lat, current.lng);
            map.panTo(center);
            this.setState({aMap: this.map});
            this.state.aMap.addListener('ready', this.searchNearby(map, center));
        }
    }

    componentDidMount() {
        /** NOTE
         * Currently all major modern browsers save for IE require valid https certificate
         * to be enabled before allowing site to use the inbuilt html5 navigator feature for getting
         * as such an extra Google API call is made to the geolocation library.
         * Once the site has valid certification and is deployed uncomment the following, code and debug.
         * Ideally the code should run as is, but if any modifications are made to this code beyond version 1.0
         * please verify
         */
        //Get geolocation info from API then render it in map markings.
        if (this.props.centerAroundCurrentLocation) {
            fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_KEY}`, {
                method: 'POST'
            }).then(res => res.json())
                .then(json => {

                    this.setState({
                        currentLocation: {
                            lat: json.location.lat,
                            lng: json.location.lng
                        }
                    })
                });
        }
        this.loadMap();
    }

    loadMap() {
        if (this.props && this.props.google) {
            // checks if google is available
            const {google} = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            // reference to the actual DOM element
            const node = ReactDOM.findDOMNode(mapRef);

            let {zoom} = this.props;
            const {lat, lng} = this.state.currentLocation;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign(
                {},
                {
                    center: center,
                    zoom: zoom,
                }
            );
            // maps.Map() is constructor that instantiates the map
            this.map = new maps.Map(node, mapConfig);
            this.setState({aMap: this.map});
        }
    }


    searchNearby = (map, center) => {
        if (this.props && this.props.google) {
            const {google} = this.props;

            const service = new google.maps.places.PlacesService(map);

            // Specify location, radius and place types for your Places API search.
            const request = {
                location: center,
                radius: '5000',
                name: 'Homeless services'
            };
            //Add Current Location
            var infoWindow = new google.maps.InfoWindow()
            var currLoc = new google.maps.Marker({
                map: map,
                position: center
            })
            //when map opens first show the info
            infoWindow.setContent('you are here')
            infoWindow.open(map, currLoc)
            //when clicked also show marker info
            google.maps.event.addListener(currLoc, 'click', function () {
                infoWindow.setContent('you are here');
                infoWindow.open(map, this);
            })
            service.nearbySearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK)
                    this.setState({places: results});
                for (var i = 0; i < results.length; i++) {
                    this.createMarker(results[i], map, infoWindow);
                }
            });

        }
    };

    createMarker = (aPlace, thisMap, infoWindow) => {
        const {google} = this.props;
        var marker = new google.maps.Marker({
            map: thisMap,
            position: aPlace.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function () {

            infoWindow.setContent(aPlace.name);
            infoWindow.open(thisMap, this);
        });

    };


    renderChildren() {
        const {children} = this.props;

        if (!children) return;

        return React.Children.map(children, c => {
            if (!c) return;
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation
            });
        });
    }


    render() {
        const style = Object.assign({}, mapStyles.map);
        return (
            <div>
                <div style={style} ref="map">
                    Loading map...
                </div>
                {this.renderChildren()}
            </div>
        );
    }


}

export default CurrentLocation;


CurrentLocation.defaultProps = {
    zoom: 12,
    initialCenter: {
        lat: -1.2884,
        lng: 36.8233
    },
    centerAroundCurrentLocation: false,
    visible: true
};


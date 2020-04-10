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
    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      },
      places:[]
    };
    
    this.searchNearby = this.searchNearby.bind(this);
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
    }
  }

  componentDidMount() {
   /* navigator wont work this way till protocol is https  
   if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

          console.log("POS", position)
          }, error => {
          console.error(error)
          })
      
      }else{
        alert("Not able to get geolocation coordinates, check if browser version is compatible.")
      }
    }*/
    //Get geolocation info from API then render it in map markings.
    if(this.props.centerAroundCurrentLocation){
      fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_KEY}`,{
      method:'POST'
    }) .then(res => res.json())
    .then(json => {
      //console.log("JSONRES", json.location.lat, json.location.lng);
      this.setState({
        currentLocation:{
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
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      //console.log('REF', mapRef)
      // reference to the actual DOM element
      const node = ReactDOM.findDOMNode(mapRef);

      let { zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
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
      //Add a listener to the map so that when it is ready we can add additional places
    
      this.map.addListener('tilesloaded', this.searchNearby(this.map, center));
      
    }
  }


  

  searchNearby = (map, center) => {
    alert("MAP MADE!")
    console.log("MAP", map, "Center", center)
    if (this.props && this.props.google) {
          const { google } = this.props;

         const service = new google.maps.places.PlacesService(map);

        // Specify location, radius and place types for your Places API search.
        const request = {
          location: center,
          radius: '5000',
          name:'social service organization'
        };

        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK)
            this.setState({ places: results });
        });
        console.log("PLACES", this.state.places)
  }
  };

  
   renderChildren() {
    const { children } = this.props;

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
  zoom: 14,
  initialCenter: {
    lat: -1.2884,
    lng: 36.8233
  },
  centerAroundCurrentLocation: false,
  visible: true
};


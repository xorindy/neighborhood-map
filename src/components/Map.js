import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const MyMapComponent = withScriptjs(withGoogleMap(props => (
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 36.1124493, lng: -115.1716128 }}
  >
  </GoogleMap>
 ))
)
export default class Map extends Component {

    render() {
        return (
            <MyMapComponent
                {...this.props}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCgQ_AkG66ugXFSqnfk01xYIIlXwDWR3Tc"
                loadingElement={<div style={{ height: `100%` }}/>}
                containerElement={<div style={{ height: `100%` }}/>}
                mapElement={<div style={{ height: `100%` }}/>}
            />
        )
    }
}
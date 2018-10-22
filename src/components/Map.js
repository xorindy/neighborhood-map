import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, InfoWindow ,Marker } from 'react-google-maps'

const MyMapComponent = withScriptjs(
    withGoogleMap(prop => (
        <GoogleMap

            defaultOptions={{ styles: mapStyle }}
            defaultZoom={13}
            defaultCenter={{ lat: 36.1124493, lng: -115.1716128 }}
            zoom={prop.zoom}
            center= {{
                lat: parseFloat(prop.center.lat),
                lng: parseFloat(prop.center.lng)
            }}
        >

            {prop.markers && prop.markers.filter(marker => marker.isVisible).map((marker, idx) => (
            <Marker key={idx} 
                    position={{lat: marker.lat, lng: marker.lng}} 
                    onClick={() => prop.markerClick(marker)}>

                {marker.isOpen && 
                    <InfoWindow>
                        <p>Hello!</p>
                    </InfoWindow>}
                    
            </Marker>

            ))}

        </GoogleMap>
    ))
)

const mapStyle = [{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"simplified"},{"color":"#e94f3f"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"on"},{"gamma":"0.50"},{"hue":"#ff4a00"},{"lightness":"-79"},{"saturation":"-86"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"hue":"#ff1700"}]},{"featureType":"landscape.natural.landcover","elementType":"all","stylers":[{"visibility":"on"},{"hue":"#ff0000"}]},{"featureType":"poi","elementType":"all","stylers":[{"color":"#e74231"},{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"color":"#4d6447"},{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"color":"#f0ce41"},{"visibility":"off"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"color":"#363f42"}]},{"featureType":"road","elementType":"all","stylers":[{"color":"#231f20"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#6c5e53"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#313639"},{"visibility":"off"}]},{"featureType":"transit","elementType":"labels.text","stylers":[{"hue":"#ff0000"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"visibility":"simplified"},{"hue":"#ff0000"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#0e171d"}]}]
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
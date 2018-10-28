import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, InfoWindow ,Marker } from 'react-google-maps'


const MyMapComponent = withScriptjs(
    withGoogleMap(props => (
        <GoogleMap

            defaultOptions={{ styles: mapStyle }}
            defaultZoom={13}
            defaultCenter={{ lat: 36.1124493, lng: -115.1716128 }}
            zoom={props.zoom}
            center= {{
                lat: parseFloat(props.center.lat),
                lng: parseFloat(props.center.lng)
            }}
        >

            {props.markers && props.markers.filter(marker => marker.isVisible).map((marker, idx) => {

                const venueInfo=props.places.find(venue => venue.id === marker.id)

                return (<Marker key={idx} 
                    position={{lat: marker.lat, lng: marker.lng}} 
                    onClick={() => props.markerClick(marker)}>

                {marker.isOpen && venueInfo.bestPhoto && (
                    
                    <InfoWindow>
                        <div className="info-window">
                            <p className="venue-name">{venueInfo.name}</p>
                            <img src={`${venueInfo.bestPhoto.prefix}200x150${venueInfo.bestPhoto.suffix}`} alt={`${venueInfo.name}`}></img>
                            <p className="venue-address">
                                {venueInfo.location.address} <br />
                                {venueInfo.location.formattedAddress[1]}
                            </p>
                        </div>
                    </InfoWindow>
                )}

                {marker.isOpen && !venueInfo.bestPhoto && (
                    <InfoWindow>
                    <div className="info-window">
                        <p className="venue-name">{venueInfo.name}</p>
                        <img src="https://fakeimg.pl/200x150/?text=No+Image+Available&font=museos&font_size=26" alt={`${venueInfo.name}`}></img>
                        <p className="venue-address">
                            {venueInfo.location.address} <br />
                            {venueInfo.location.formattedAddress[1]}
                        </p>
                    </div>
                </InfoWindow>
                )}

            </Marker>
                )

            })}

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
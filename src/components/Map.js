/*global google*/
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

                return (
                    <Marker key={idx} 
                        position={{lat: marker.lat, lng: marker.lng}}
                        icon={'http://maps.google.com/mapfiles/ms/icons/purple-pushpin.png'}
                        onClick={() => props.markerClick(marker)}
                        animation={
                            marker.isOpen === true
                            ? google.maps.Animation.BOUNCE
                            : marker.isOpen === false
                            ? null
                            : google.maps.Animation.DROP                           
                        }
                    > 

                    {marker.isOpen && venueInfo.bestPhoto && (
                    
                    <InfoWindow>
                        <div className="info-window">
                            <p className="venue-name" tabIndex="4">{venueInfo.name}</p>
                            <img src={`${venueInfo.bestPhoto.prefix}200x150${venueInfo.bestPhoto.suffix}`} className="venue-photo" alt={`${venueInfo.name}`}></img>
                            <p className="venue-address" tabIndex="4">
                                {venueInfo.location.address} <br />
                                {venueInfo.location.formattedAddress[1]}
                            </p>
                        </div>
                    </InfoWindow>
                )}

                {marker.isOpen && !venueInfo.bestPhoto && (
                    <InfoWindow>
                    <div className="info-window"
                        tabIndex="4">
                        <p className="venue-name">{venueInfo.name}</p>
                        <img src="https://imgplaceholder.com/200x150/cccccc/ffffff/fa-image" alt={`${venueInfo.name}`} className="no-image"></img>
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

const mapStyle = [{"featureType":"road","stylers":[{"hue":"#5e00ff"},{"saturation":-79}]},{"featureType":"poi","stylers":[{"saturation":-78},{"hue":"#6600ff"},{"lightness":-47},{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"lightness":22}]},{"featureType":"landscape","stylers":[{"hue":"#6600ff"},{"saturation":-11}]},{},{},{"featureType":"water","stylers":[{"saturation":-65},{"hue":"#1900ff"},{"lightness":8}]},{"featureType":"road.local","stylers":[{"weight":1.3},{"lightness":30}]},{"featureType":"transit","stylers":[{"visibility":"simplified"},{"hue":"#5e00ff"},{"saturation":-16}]},{"featureType":"transit.line","stylers":[{"saturation":-72}]},{}]

export default class Map extends Component {

    render() {
        return (
            <MyMapComponent
                {...this.props}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCgQ_AkG66ugXFSqnfk01xYIIlXwDWR3Tc"
                loadingElement={<div style={{ height: `100%` }}/>}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}
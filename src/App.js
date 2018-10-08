import React, { Component } from 'react'
import axios from 'axios'
import './App.css'

class App extends Component {

  state = {
    places: []
  }


  componentDidMount() {
    this.getPlaces()
    
  }
  
  
  loadMap = () => {
    initScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCgQ_AkG66ugXFSqnfk01xYIIlXwDWR3Tc&callback=initMap')
    window.initMap = this.initMap
  }
  
  initMap = () => {
    // map styles
    const mapStyle = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#6195a0"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":"0"},{"saturation":"0"},{"color":"#f5f5f2"},{"gamma":"1"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"lightness":"-3"},{"gamma":"1.00"}]},{"featureType":"landscape.natural.terrain","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#bae5ce"},{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#fac9a9"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#787878"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"transit.station.airport","elementType":"labels.icon","stylers":[{"hue":"#0a00ff"},{"saturation":"-77"},{"gamma":"0.57"},{"lightness":"0"}]},{"featureType":"transit.station.rail","elementType":"labels.text.fill","stylers":[{"color":"#43321e"}]},{"featureType":"transit.station.rail","elementType":"labels.icon","stylers":[{"hue":"#ff6c00"},{"lightness":"4"},{"gamma":"0.75"},{"saturation":"-68"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#eaf6f8"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c7eced"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"lightness":"-49"},{"saturation":"-53"},{"gamma":"0.79"}]}]
    // initialize map
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 36.1124493, lng: -115.1716128}, 
      zoom: 13,
      styles: mapStyle
    })

    // create only one instance of the info window
    const infoWindow = new window.google.maps.InfoWindow()
    

    this.state.places.map(place => {
      
      const myPlace = {lat: place.venue.location.lat, lng: place.venue.location.lng}
      const imageURL = `https://maps.googleapis.com/maps/api/streetview?size=300x200&location=${place.venue.location.lat},${place.venue.location.lng}&key=AIzaSyCgQ_AkG66ugXFSqnfk01xYIIlXwDWR3Tc`

      // create the content of the info window
      const contentString = `<h3><strong>${place.venue.name}</strong></h3> <p> 
        <div id="pano"> <img src="${imageURL}"> </div> <br />
        ${place.venue.location.address} <br />
        ${place.venue.location.city} <br />
        ${place.venue.location.state} ${place.venue.location.postalCode}<br />
        `

      // create marker for each place in the places array
      const marker = new window.google.maps.Marker({
        position: myPlace,
        map: map,
        limit: 50,
        title: place.venue.name,
        animation: window.google.maps.Animation.DROP
      })

      // add an onclick listener to open infowindow when a marker is clicked
      marker.addListener('click', function() {
        
        
        // set content of the info window
        infoWindow.setContent(contentString)

        // open the info window
        infoWindow.open(map, marker)
      })

      return null

    })

  }

  getPlaces = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
    const params = {
      client_id: '1OHRXNFKHBMCPQXLUR32TQ4FG2HCIVDFERWN2RVBFPH34MDH',
      client_secret: 'YTCU10YMNIIM2IMMR1M23DXZV021G45EVSWECJHYWLGQU0IP',
      v: '20181007',
      limit: 50,
      near: 'Las Vegas, NV',
    }

    axios.get(endPoint + new URLSearchParams(params))
      .then(response => {
        this.setState({
          // Store venues in the places array
          places: response.data.response.groups[0].items
        }, this.loadMap())
      })
      .catch(error => {
        console.log('ERROR: ' + error)
      })
  }


  render() {
    return (
      <div className="app">

        <header className="app-header">
          <h1 className="app-title">My Neighborhood Map</h1>
        </header>

        <div id="map">

        </div>
        
      </div>
      
    )
  }
}

// Function to make the script and load it for the API key
function initScript(url) {
  const reference = window.document.getElementsByTagName("script")[0]
  const script = window.document.createElement("script")

  script.src = url
  script.async = true
  script.defer = true

  reference.parentNode.insertBefore(script, reference)
}

export default App;
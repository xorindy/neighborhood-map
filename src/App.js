import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import Sidebar from './components/Sidebar'

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
    const mapStyle = [{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"simplified"},{"color":"#e94f3f"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"on"},{"gamma":"0.50"},{"hue":"#ff4a00"},{"lightness":"-79"},{"saturation":"-86"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"hue":"#ff1700"}]},{"featureType":"landscape.natural.landcover","elementType":"all","stylers":[{"visibility":"on"},{"hue":"#ff0000"}]},{"featureType":"poi","elementType":"all","stylers":[{"color":"#e74231"},{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"color":"#4d6447"},{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"color":"#f0ce41"},{"visibility":"off"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"color":"#363f42"}]},{"featureType":"road","elementType":"all","stylers":[{"color":"#231f20"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#6c5e53"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#313639"},{"visibility":"off"}]},{"featureType":"transit","elementType":"labels.text","stylers":[{"hue":"#ff0000"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"visibility":"simplified"},{"hue":"#ff0000"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#0e171d"}]}]
    
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
        <div id="venue-photo"> <img src="${imageURL}"> </div> <br />
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

        <Sidebar />

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
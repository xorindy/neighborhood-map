import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.loadMap()
  }

  loadMap = () => {
    initScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCgQ_AkG66ugXFSqnfk01xYIIlXwDWR3Tc&callback=initMap')
    window.initMap = this.initMap
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 36.1124493, lng: -115.1716128}, 
      zoom: 13
    })
    // Default markers on the map
    const locations = [
      {title: 'Sea Quest Las Vegas', location: {lat: 36.12301, lng: -115.1349287}},
      {title: 'Zak Bagans Haunted Museum', location: {lat: 36.1571324, lng: -115.1472111}},
      {title: 'Las Vegas Sign', location: {lat: 36.0833733, lng: -115.1737739}},
      {title: 'Marvel Avengers Station', location: {lat: 36.1250655, lng: -115.1746774}},
      {title: 'Outdoor Gondola Rides', location: {lat: 36.1170653, lng: -115.1717004}}
    ]

    let infoWindow = new window.google.maps.InfoWindow()

    // Create array of markers to load
    for (var i=0; i < locations.length; i++) {
      
      // Get positions from locations array
      let pos = locations[i].location
      let name = locations[i].title

      // Make marker for each location
      let marker = new window.google.maps.Marker({
        map: map,
        position: pos,
        title: name,
        animation: window.google.maps.Animation.DROP,
        id: i
      })

      // Push marker to our array of markers
      markers.push(marker)

      // Create onClick event to open the info window for each marker
      marker.addListener('click', function() {
        populateInfoWindow(this, infoWindow)
      })
    }
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">My Neighborhood Map</h1>
        </header>
        <div id="map"></div>
      </div>
      
    );
  }
}

// Declare markers array
const markers = [];

// Function to make the script and load it for the API key
function initScript(url) {
  const reference = window.document.getElementsByTagName("script")[0]
  const script = window.document.createElement("script")

  script.src = url
  script.async = true
  script.defer = true

  reference.parentNode.insertBefore(script, reference)
}

 // Populate the info window when marker is clicked.
 function populateInfoWindow(marker, infoWindow) {
  // Check is there is already an info window open
  if (infoWindow.marker !== marker) {
    infoWindow.marker = marker
    infoWindow.setContent('<div>' + marker.title + '</div>')
    infoWindow.open(this, marker)

    // Make sure marker is cleared when info window is closed
    infoWindow.addListener('closeClick', function() {
      infoWindow.setMarker(null)
    })
  }
}

export default App;
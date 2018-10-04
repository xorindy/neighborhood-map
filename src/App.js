import React, { Component } from 'react';
import FoursquareAPI from './api/foursquare';
import './App.css';

class App extends Component {

  componentDidMount() {
    FoursquareAPI.search({
      near: 'Las Vegas, NV',
      query: 'park',
      limit: 15
    })

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
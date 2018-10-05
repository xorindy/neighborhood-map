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
    // initialize map
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 36.1124493, lng: -115.1716128}, 
      zoom: 12
    })

    // create only one instance of the info window
    const infoWindow = new window.google.maps.InfoWindow()

    this.state.places.map(place => {

      // create the content of the info window
      const contentString = `<h3><strong>${place.venue.name}</strong></h3> <p> 
        ${place.venue.location.address} <br />
        ${place.venue.location.city} <br />
        ${place.venue.location.state} ${place.venue.location.postalCode}<br />
        `

      // create marker for each place in the places array
      const marker = new window.google.maps.Marker({
        position: {lat: place.venue.location.lat, lng: place.venue.location.lng},
        map: map,
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
      v: '20181004',
      query: 'food',
      limit: 15,
      near: 'Las Vegas'
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
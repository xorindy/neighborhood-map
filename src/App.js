import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import SideBar from './components/SideBar'
import Map from './components/Map'

class App extends Component {

  // States that store information
  constructor() {
    super()
    this.state = {
      places: [],
      markers: [],
      center: [],
      zoom: 13,
      updateSuperState: obj => {
        this.setState(obj)
      }
    }
  }

  updateQuery = (newQuery) => {
    this.setState({
      query: newQuery
    })
  };
 
  componentDidMount() {
    this.getPlaces()
 
  }

  // Get venues from Foursquare API with axios to help get request
  getPlaces = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/search?'
    const params = {
      client_id: '1OHRXNFKHBMCPQXLUR32TQ4FG2HCIVDFERWN2RVBFPH34MDH',
      client_secret: 'YTCU10YMNIIM2IMMR1M23DXZV021G45EVSWECJHYWLGQU0IP',
      v: '20181021',
      limit: 15,
      near: 'Las Vegas, NV',
      query: 'restaurant'
    }

    axios.get(endPoint + new URLSearchParams(params))
      .then(res => {
        this.setState({
          places: res.data.response.venues,
          center: res.data.response.geocode.feature.geometry.center,
          markers: res.data.response.venues.map(venue => {
            
            return {
              lat: venue.location.lat,
              lng: venue.location.lng,
              isOpen: false,  //is info window open
              isVisible: true, //is marker visible
              id: venue.id
            }
          })
        })


      })
      .catch(error => {
        console.log('ERROR: ' + error)
        alert('Unable to get venues.')
      })

  }

  getDetails = () => {
    const endPoint = `https://api.foursquare.com/v2/venues/${this.state.markers.id}?`
    const params = {
      client_id: '1OHRXNFKHBMCPQXLUR32TQ4FG2HCIVDFERWN2RVBFPH34MDH',
      client_secret: 'YTCU10YMNIIM2IMMR1M23DXZV021G45EVSWECJHYWLGQU0IP',
      v: '20181021'}

    axios.get(endPoint + new URLSearchParams(params))
      .then(res => {
        const venue = this.state.places.find(place => place.id === this.state.markers.id)
        const updateDetails = Object.assign(venue, res.data.response.venue)
        
        this.setState({
          places: Object.assign(this.state.places, updateDetails)
        })
      })
      .catch(error => {
        console.log('Sorry, No image available.')
      })

  }

  // Handles closing all markers that are open
  closeMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false
      return marker
    })
    this.setState({markers: Object.assign(this.state.markers, markers)})
  }

  // Handles opening of the marker when clicked
  markerClick = (marker) => {
    // close all open markers first before opening a new one
    this.closeMarkers() 

    marker.isOpen = true
    this.setState({
      markers: Object.assign(this.state.markers, marker),
      center: {lat: this.state.markers.lat, lng: this.state.markers.lng}
    })
    this.getDetails()
  }
  
  // Handles opening items in the sidebar
  sidebarItemClick = (place) => {
    const marker = this.state.markers.find(marker => marker.id === place.id)
    this.markerClick(marker)
    
  }

  /* Set the width of the side navigation to 250px */
  openNav = () => {
  document.getElementById("sidebar").style.width = "300px"
  }

  /* Set the width of the side navigation to 0 */
  closeNav = () => {
  document.getElementById("sidebar").style.width = "0"
  } 


  render() {

    return (
      <div className="app">

        <h1 className="header-title" tabIndex="0"> Las Vegas, NV </h1>

        <span className="sidebar-btn" onClick={ () => this.openNav() } alt="menu"> &#9776; </span>

        <div id="sidebar" className="side-bar">
        <SideBar {...this.state}
          updateQuery={this.updateQuery}
          sidebarItemClick={this.sidebarItemClick}
          closeMarkers={this.closeMarkers}
          closeNav={this.closeNav}/>
        </div>

        <div id="map">
          <Map {...this.state} markerClick={this.markerClick} />
        </div>
        

      </div>
      
    )
  }

}

export default App;
import React, { Component } from 'react'
import axios from 'axios'
import './App.css'

import Map from './components/Map'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      places: [],
      markers: [],
      center: [],
      zoom: 13
    }
  }

  onUpdate = (val) => {
    this.setState({
      places: val
    })
  };
 
  componentDidMount() {
    this.getPlaces()
 
  }

  getPlaces = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/search?'
    const params = {
      client_id: '1OHRXNFKHBMCPQXLUR32TQ4FG2HCIVDFERWN2RVBFPH34MDH',
      client_secret: 'YTCU10YMNIIM2IMMR1M23DXZV021G45EVSWECJHYWLGQU0IP',
      v: '20181010',
      limit: 15,
      near: 'Las Vegas, NV',
      query: 'Food'
    }

    axios.get(endPoint + new URLSearchParams(params))
      .then(res => {

        console.log(res)
        this.setState({
          places: res.data.response.venues,
          center: res.data.response.geocode.feature.geometry.center,
          markers: res.data.response.venues.map(venue => {
            return {
              lat: venue.location.lat,
              lng: venue.location.lng,
              isOpen: false,  //is info window open
              isVisible: true //is marker visible

            }
          })
        })


      })
      .catch(error => {
        console.log('ERROR: ' + error)
      })

  }

  
  sidebarItemClick = (place) => {
    console.log(place)    
  }

  render() {

    return (
      <div className="app">


        <h1 className="header-title"> Food in Las Vegas </h1>

      <div id="map">
        <Map {...this.state}/>
      </div>
        

      </div>
      
    )
  }

}

export default App;
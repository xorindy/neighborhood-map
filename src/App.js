import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import SideBar from './components/SideBar'
import Map from './components/Map'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      places: []
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
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
    const params = {
      client_id: '1OHRXNFKHBMCPQXLUR32TQ4FG2HCIVDFERWN2RVBFPH34MDH',
      client_secret: 'YTCU10YMNIIM2IMMR1M23DXZV021G45EVSWECJHYWLGQU0IP',
      v: '20181010',
      limit: 50,
      near: 'Las Vegas, NV',
      query: 'Food'
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

  
  sidebarItemClick = (place) => {
    console.log(place)    
  }

  render() {

    return (
      <div className="app">

        <SideBar pageWrapId={"page-wrap"} 
          outerContainerId={"App"}  
          onUpdate={this.onUpdate}
          sidebarItemClick={this.sidebarItemClick}
          {...this.state}
        />

        <h1 className="header-title"> Food in Las Vegas </h1>
        
      <div id="map">
        <Map />
      </div>
        

      </div>
      
    )
  }

}

export default App;
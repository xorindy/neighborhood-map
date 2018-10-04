import React, { Component } from 'react';
import FoursquareAPI from './api/foursquare';
import './App.css';

class App extends Component {

  componentDidMount() {
    FoursquareAPI.search({
      near: 'Las Vegas, NV',
      query: 'park',
      limit: 15
    });
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


export default App;
import React, { Component } from 'react';
import './App.css';

class App extends Component {

  initMap = () => {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644}, 
      zoom: 8
    });
  }

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
      
    );
  }
}

/* 
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&callback=initMap" async defer></script>
*/

export default App;

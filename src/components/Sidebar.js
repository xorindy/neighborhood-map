import React, { Component } from 'react'
import VenueList from './VenueList'


export default class Sidebar extends Component {
    render() {
        return(
        <div className="side-bar">
            <input type={"search"} id={"search-bar"} placeholder={"Filter Venues"} />

            <VenueList {...this.props}/>
        </div>
        )
    }
}
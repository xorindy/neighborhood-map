import React, { Component } from 'react'
import VenueList from './VenueList'


export default class Sidebar extends Component {
    render() {
        return(
        <div className="side-bar">
            <VenueList />
        </div>
        )
    }
}
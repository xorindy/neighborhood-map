import React, { Component } from 'react'
import ListItems from './ListItems'

export default class VenueList extends Component {
    render() {
        return (
            <ul className="venue-list">
                <ListItems />
            </ul>
        )
    }
}
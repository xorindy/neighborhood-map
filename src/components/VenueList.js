import React, { Component } from 'react'
import ListItems from './ListItems'

export default class VenueList extends Component {
    render() {
        return (
            <ul className="venue-list">
                {this.props.places && this.props.places.map((place, idkey) => (
                <ListItems key={idkey} {...place}/>
                ))}
            </ul>
        )
    }
}
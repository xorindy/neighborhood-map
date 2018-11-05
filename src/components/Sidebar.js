import React, { Component } from 'react'
import ListItem from './ListItem'
import {slide as Sidebar} from 'react-burger-menu'


class SideBar extends Component {
    constructor() {
        super()
        this.state = {
            query:"",
            places: []
        }
    }

    filterVenues = () => {
        if(this.state.query.trim() !== "") {
            const venues = this.props.places.filter(venue => venue.name.toLowerCase()
                .includes(this.state.query.toLowerCase()) )
                return venues
        }
        return this.props.places 
    }

    updateMapMarkers = (e) => {
        this.setState({query: e.target.value})

        const markers = this.props.places.map(venue => {
            // convert query to lowercase and venue names to lower case
            const markerMatched = venue.name.toLowerCase().includes(e.target.value.toLowerCase())
            // find id matching ids
            const marker = this.props.markers.find(marker => marker.id === venue.id)
            // when we find a match, make the markers appear, if not, hide the marker
            if(markerMatched) {
                marker.isVisible = true
            } else {
                marker.isVisible = false
            }
            return marker
        })

        this.props.updateSuperState({markers})
    }


    render() {

        return(

            <Sidebar>

            <input type={"search"} 
                id={"search-bar"} 
                placeholder={"Filter Venues"} 
                onChange={this.updateMapMarkers}/>

            <ol value={this.props.places} className="venue-list">
            
            {this.filterVenues() && 
             this.filterVenues().map((place, placeKey) => (
                <ListItem {...place} 
                    key={placeKey} 
                    sidebarItemClick={this.props.sidebarItemClick}/> 
            ))}
        
            
            </ol>

            </Sidebar>
        )
    }
}


export default SideBar

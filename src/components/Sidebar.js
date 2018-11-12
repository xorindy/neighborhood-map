import React, { Component } from 'react'
import ListItem from './ListItem'



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
        this.props.closeMarkers()
    }


    render() {

        return(
            <div className="sidebar-content">

                <span className="closebtn" 
                      onClick={ () => this.props.closeNav() }
                      onKeyPress={ () => this.props.closeNav() }
                      tabIndex="1"
                      aria-label="close sidebar"
                      role="button">
                        close &#10008; 
                </span>

                <input  
                    id={"search-bar"} 
                    placeholder={"Filter Venues"} 
                    onChange={this.updateMapMarkers}
                    aria-label="filter venues by name"
                    tabIndex="2"/>

                <ol value={this.props.places} className="venue-list" tabIndex="-1">
            
                {this.filterVenues() && 
                this.filterVenues().map((place, placeKey) => (
                    <ListItem {...place} 
                        key={placeKey} 
                        sidebarItemClick={this.props.sidebarItemClick}/> 
                ))}
        
            
                </ol>
            </div>

        )
    }
}


export default SideBar

import React, { Component } from 'react'

class ListItem extends Component {

    render() {
        return(
            <li className="list-item" onClick={ () => this.props.sidebarItemClick(this.props.venue) }>
                {this.props.venue.name}
            </li>
            
        )
    }
}

export default ListItem
import React, { Component } from 'react'

class ListItem extends Component {

    render() {
        return(
            <li className="list-item" onClick={ () => this.props.sidebarItemClick(this.props) }>

            <img src={this.props.categories[0].icon.prefix + "32" + this.props.categories[0].icon.suffix} alt={this.props.categories[0].name} />

            {this.props.name}
                
            </li>

            
            
        )
    }
}

export default ListItem
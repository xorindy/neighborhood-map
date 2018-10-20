import React, { Component } from 'react'
import ListItem from './ListItem'
import {slide as Sidebar} from 'react-burger-menu'


class SideBar extends Component {

    update = (e) => {
        console.log(e.target.value);
        this.props.onUpdate(e.target.value);
        this.setState({fieldVal: e.target.value});
    }


    render() {

        return(

            <Sidebar>
            <input type={"search"} id={"search-bar"} placeholder={"Filter Venues"} />

            <ul onChange={this.update}
                value={this.props.places}
                className="venue-list">
            
            {this.props.places && 
             this.props.places.map((place, placeKey) => (
                <ListItem {...place} key={placeKey}/> 
            ))}
        
            
            </ul>

            </Sidebar>
        )
    }
}


export default SideBar
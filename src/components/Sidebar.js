import React from 'react'
import {slide as Sidebar} from 'react-burger-menu'

export default props => {
        return (
        <Sidebar {...props}>
            <input type={"search"} id={"search-bar"} placeholder={"Filter Venues"} />


        </Sidebar>
        )
    }

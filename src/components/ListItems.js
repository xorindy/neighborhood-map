import React, { Component } from 'react'

export default class ListItems extends Component {
    render() {
        return (
            <li className="list-item">
                {this.props.name}
            </li>
        )
    }
}
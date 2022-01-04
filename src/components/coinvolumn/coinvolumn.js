import React, { Component } from 'react';
import "./coinvolumn.css";

export default class BTCvolumn extends Component {
    render() {

        return (
            <p className="">
                {this.props.totalvolumn[this.props.totalvolumn.length - 1]
                }
            </p>
        )
    }
}

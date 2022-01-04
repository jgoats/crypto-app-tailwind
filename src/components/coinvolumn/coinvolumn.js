import React, { Component } from 'react'

export default class BTCvolumn extends Component {
    render() {

        return (
            <p className="coin-price">
                {this.props.totalvolumn[this.props.totalvolumn.length - 1]
                }
            </p>
        )
    }
}

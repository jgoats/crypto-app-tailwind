import React, { Component } from 'react';
import "./coinprice.scss";

export default class CoinPrice extends Component {
    render() {
        return (
            <p className="coin-price">
                {`${this.props.currentcoinprice}`}
            </p>
        )
    }
}

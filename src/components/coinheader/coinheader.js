import React, { Component } from 'react';
import "./coinheader.css";

export default class CoinHeader extends Component {
    render() {
        return (
            <div className="coin-header-container">
                <span>#</span>
                <span>Logo</span>
                <p className="coin-header-name">Name</p>
                <p>{`Price (${this.props.currencyabbr})`}</p>
                <p>1h</p>
                <p>24h</p>
                <p>7d</p>
                <p className="coin-header-marketcap">Last 7 Days</p>
            </div>
        )
    }
}

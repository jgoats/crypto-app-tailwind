import React, { Component } from 'react';
import "./coinheader.css";

export default class CoinHeader extends Component {
    render() {
        return (
            <div className=" bg-green-300 coin-header-container p-3 w-full">
                <p className="font-bold coin-header-item">#</p>
                <p className="font-bold  sm:block coin-header-logo hidden coin-header-item">Logo</p>
                <p className="font-bold  coin-header-item coin-header-name">Name</p>
                <p className="font-bold  coin-header-item">Price</p>
                <p className="font-bold  sm:block hidden coin-header-item">1h</p>
                <p className="font-bold  sm:block hidden coin-header-item">24h</p>
                <p className="font-bold  coin-header-item">7d</p>
                <p className="font-bold  coin-header-item coin-header-marketcap md:block hidden">Last 7 Days</p>
            </div>
        )
    }
}

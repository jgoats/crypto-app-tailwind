import React from "react";
import "./overview.scss";
import CoinPrice from "../coinprice/coinprice.js";
import CurrentDate from "../currentdate/currentdate";
import LineGraph from "../linegraph/linegraph.js";
import BarGraph from "../bargraph/bargraph.js";
import BTCvolumn from "../coinvolumn/coinvolumn.js";

export default class Overview extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        return (
            <div className="overview-container">
                <section className="overview-section">
                    <p className="overview-section-coin-header">{this.props.coin}</p>
                    <CurrentDate />
                    <CoinPrice currentcoinprice={this.props.currentcoinprice} />
                    <LineGraph handleSpinner={this.props.handleSpinner} graphColor={this.props.graphColor} graphlabels={this.props.graphlabels} handleDuration={this.props.handleDuration} price={this.props.price} />
                </section>
                <section className="overview-section">
                    <p className="overview-section-coin-header">volumn (24h)</p>
                    <CurrentDate />
                    <BTCvolumn totalvolumn={this.props.totalvolumn} />
                    <BarGraph totalvolumn={this.props.totalvolumn} />
                </section>
            </div>
        )
    }
}
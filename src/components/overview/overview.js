import React, { Component } from 'react';
import "./overview.css";
import "../../css/styles.css";
import MainGraph from "../maingraph/maingraph.js";
import BarGraph from "../bargraph/bargraph.js";
import CoinPrice from "../coinprice/coinprice.js";
import CurrentDate from "../currentdate/currentdate.js";

export default class Overview extends Component {
    constructor() {
        super();
        this.state = {
            graphColor: ["rgb(25, 150, 64)", "rgba(25, 150, 64, 0.2)"],
        }
    }
    render() {
        return (
            <div style={{ backgroundColor: `${this.props.bgdisplay}`, color: `${this.props.textdisplay}` }}
                className={`overview-container sm:p-10 p-2 w-full relative`}>
                <h1 className={`text-3xl font-light p-10`}>current selected crypto currency</h1>
                <div className="flex lg:flex-row flex-col items-center justify-center gap-20">
                    <MainGraph
                        handleDuration={this.props.handleDuration}
                        price={this.props.price}
                        handleSpinner={this.props.handleSpinner}
                        graphColor={this.props.graphColor}
                        graphlabels={this.props.dates}
                        coin={this.props.coin}
                        currentcoinprice={this.props.currentcoinprice}
                        bgdisplay={this.props.bgdisplay}
                        textdisplay={this.props.textdisplay} />
                    <BarGraph
                        coin={this.props.coin}
                        totalvolumn={this.props.totalvolumn}
                        bargraphborder={this.props.bargraphborder}
                        bargraphcolor={this.props.bargraphcolor} />
                </div>
                <h1 className={`coins-main-header text-3xl font-light p-10 mb-10`}>Top 20 Crypro Currencies (based on market cap)</h1>
            </div>
        )
    }
}

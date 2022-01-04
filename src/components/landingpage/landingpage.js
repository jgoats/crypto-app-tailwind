import React from "react";
import "./landingpage.css";
import Navigation from "../navigation/navigation.js";
import Overview from "../overview/overview.js";
import Coins from "../coins/coins.js";

export default class Landingpage extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        return (
            <div className="landingpage-container">
                <Navigation
                    changeCoin={this.props.changeCoin}
                    currency={this.props.currency}
                    currencyabbr={this.props.currencyabbr}
                    changeCurrency={this.props.changeCurrency}
                    handleSpinner={this.props.handleSpinner} />
                <p className="overview-heading">{`${this.props.coin.replace(this.props.coin[0], this.props.coin[0].toUpperCase())} Overview`}</p>
                <Overview
                    handleSpinner={this.props.handleSpinner}
                    coin={this.props.coin}
                    totalvolumn={this.props.totalvolumn}
                    graphColor={this.props.graphColor}
                    graphlabels={this.props.graphlabels}
                    handleDuration={this.props.handleDuration}
                    price={this.props.price}
                    currentcoinprice={this.props.currentcoinprice} />
                <p className="overview-heading">Popular Coins</p>
                <Coins wascurrencychanged={this.props.wascurrencychanged} setCurrency={this.props.setCurrency} currencyabbr={this.props.currencyabbr} />

            </div>
        )
    }
}
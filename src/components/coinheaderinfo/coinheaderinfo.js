import React, { Component } from 'react';
import "./coinheaderinfo.css";
import LossArrow from "../../images/loss-arrow.svg";
import ProfitArrow from "../../images/profit-arrow.svg";

export default class CoinHeaderInfo extends Component {
    render() {
        return (
            <div className="coin-header-info-container">
                <p>Total Coins {this.props.totalCoins}</p>
                <div>{this.props.performance ? <div className="arrow-container"><p>Profit</p><img className="profit-arrow" src={ProfitArrow} /></div> :
                    <div className="arrow-container"><p>Loss</p><img className="loss-arrow" src={LossArrow} /></div>}</div>
                <p>{this.props.mostCoin}</p>
                <p>{this.props.secondMostCoin}</p>
                <p>{this.props.thirdMostCoin}</p>
            </div>
        )
    }
}

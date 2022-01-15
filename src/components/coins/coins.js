import React from "react";
import "./coins.css";
import CoinHeader from "../coinheader/coinheader.js";
import CoinInfo from "../coininfo/coininfo.js";

export default class Coins extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        return (
            <section className="coins-main-container">
                <CoinHeader
                    currencyabbr={this.props.currencyabbr}
                    bgdisplay={this.props.bgdisplay}
                    textdisplay={this.props.textdisplay} />
                <CoinInfo
                    wascurrencychanged={this.props.wascurrencychanged}
                    setCurrency={this.props.setCurrency}
                    currencyabbr={this.props.currencyabbr}
                    bgdisplay={this.props.bgdisplay}
                    textdisplay={this.props.textdisplay} />
            </section>
        )
    }
}
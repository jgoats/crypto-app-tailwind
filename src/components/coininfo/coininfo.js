import React, { Component } from 'react';
import "./coininfo.css";
import Axios from "axios";
import LineGraphSmall from "../linegraphsmall/linegraphsmall.js";
import ProfitIcon from "../../images/profit-arrow.svg";
import LossIcon from "../../images/loss-arrow.svg";

export default class CoinInfo extends Component {
    constructor() {
        super();
        this.state = {
            coins: [],
            setCurrency: ""
        }
    }
    componentDidUpdate() {
        if (this.props.currencyabbr !== this.state.setCurrency) {
            let url = `api.coingecko.com/api/v3/coins/markets?vs_currency=${this.props.currencyabbr}&price_change_percentage=1h,24h,7d&sparkline=true&per_page=20`;
            let newUrl = "https://" + url.replace(" ", "");
            Axios({
                method: "get",
                url: newUrl,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((result) => {
                this.setState({
                    coins: result.data
                })
            }).catch((err) => {
                if (err) {
                    console.log(err);
                }
            })
            this.setState({
                setCurrency: this.props.currencyabbr
            })
        }

    }
    componentDidMount() {
        let url = `api.coingecko.com/api/v3/coins/markets?vs_currency=${this.props.currencyabbr}&price_change_percentage=1h,24h,7d&sparkline=true&per_page=20`;
        let newUrl = "https://" + url.replace(" ", "");
        Axios({
            method: "get",
            url: newUrl,
            headers: {
                "Content-Type": "application/json"
            }
        }).then((result) => {
            this.setState({
                coins: result.data
            })
        }).catch((err) => {
            if (err) {
                console.log(err);
            }
        })
        this.setState({
            setCurrency: this.props.currencyabbr
        })
    }
    render() {
        return (
            this.state.coins.map((coin, index) =>
                <div style={{ backgroundColor: `${this.props.bgdisplay}`, color: `${this.props.textdisplay}` }} key={index} className="coin-data p-3 flex items-center">
                    <p className="coin-number">{index + 1}</p>
                    <p className="coin-logo-container"><img className="coin-icon" src={coin.image} /></p>
                    <p className="coin-name">{coin.name}</p>
                    <p className="coin-price">{coin.current_price.toFixed(2)}</p>
                    <div className="sm:block hidden">{coin.price_change_percentage_1h_in_currency.toPrecision(3) > 0 ?
                        <div style={{ display: "flex" }}><p style={{ color: "limegreen" }}>{coin.price_change_percentage_1h_in_currency.toPrecision(3) + " %"}</p><img style={{ width: "10px", marginLeft: "5px" }} src={ProfitIcon} /></div> :
                        <div style={{ display: "flex" }}><p style={{ color: "#FF002B" }}>{coin.price_change_percentage_1h_in_currency.toPrecision(3) + " %"}</p><img style={{ width: "10px", marginLeft: "5px" }} src={LossIcon} /></div>}</div>
                    <div className="sm:block hidden">{coin.price_change_percentage_24h_in_currency.toPrecision(3) > 0 ?
                        <div style={{ display: "flex" }}><p style={{ color: "limegreen" }}>{coin.price_change_percentage_24h_in_currency.toPrecision(3) + " %"}</p><img style={{ width: "10px", marginLeft: "5px" }} src={ProfitIcon} /></div> :
                        <div style={{ display: "flex" }}><p style={{ color: "#FF002B", }}>{coin.price_change_percentage_24h_in_currency.toPrecision(3) + " %"}</p><img style={{ width: "10px", marginLeft: "5px" }} src={LossIcon} /></div>}</div>
                    {coin.price_change_percentage_7d_in_currency.toPrecision(3) > 0 ?
                        <div style={{ display: "flex" }}><p style={{ color: "limegreen", }}>{coin.price_change_percentage_7d_in_currency.toPrecision(3) + " %"}</p><img style={{ width: "10px", marginLeft: "5px" }} src={ProfitIcon} /></div> :
                        <div style={{ display: "flex" }}><p style={{ color: "#FF002B", }}>{coin.price_change_percentage_7d_in_currency.toPrecision(3) + " %"}</p><img style={{ width: "10px", marginLeft: "5px" }} src={LossIcon} /></div>}
                    <div className="bg-zinc-900 rounded-md md:block hidden">
                        <LineGraphSmall price={coin.sparkline_in_7d.price}
                            color={coin.sparkline_in_7d.price[0] < coin.sparkline_in_7d.price[coin.sparkline_in_7d.price.length - 1] ?
                                "limegreen" : "#FF002B"} />
                    </div>
                </div>
            )

        )
    }
}
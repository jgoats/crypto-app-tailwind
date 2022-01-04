import React, { Component } from 'react'
import "./changecurrency.scss";
import DropDownArrow from "../../images/drop-down-arrow.svg";
import ReactDom from "react-dom";
import Axios from "axios";

export default class ChangeCurrency extends Component {
    constructor() {
        super();
        this.state = {
            toggle: 0
        }
        this.currency = React.createRef();
    }
    handleToggle(e) {
        if (this.state.toggle == 0) {
            let popUp = this.currency.current.childNodes[1];
            let button = this.currency.current.childNodes[0];
            popUp.classList.add("currency-popup-active");
            popUp.classList.remove("currency-popup");
            button.classList.add("change-currency-active");
            button.classList.remove("change-currency");
            this.setState({
                toggle: this.state.toggle += 1
            });
            let url = `https://api.coingecko.com/api/v3/simple/supported_vs_currencies`;
            Axios({
                method: "get",
                url: url,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((result) => {
                let currencies = result.data.map((currency, index) =>
                    <button onClick={() => this.props.changeCurrency(currency)} key={index} className="currency-btn">
                        {currency}
                    </button>
                )
                ReactDom.render(currencies, popUp);
            }).catch((err) => {
                console.log(err)
            })
        }
        else {
            let popUp = this.currency.current.childNodes[1];
            popUp.classList.remove("currency-popup-active");
            popUp.classList.add("currency-popup");
            let button = this.currency.current.childNodes[0];
            button.classList.remove("change-currency-active");
            button.classList.add("change-currency");
            this.setState({
                toggle: this.state.toggle -= 1
            })
        }

    }
    render() {
        return (
            <div className="change-currency-main-container">
                <div className="change-currency-currency-type">{this.props.currency}</div>
                <div ref={this.currency} onClick={(e) => this.handleToggle(e)} className="change-currency-container">
                    <div className="change-currency">
                        <div className="currency-type">{this.props.currencyabbr}</div>
                        <img className="currency-drop-down-arrow" src={DropDownArrow} />
                    </div>
                    <div className="currency-popup">

                    </div>
                </div>
            </div>
        )
    }
}

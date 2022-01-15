import React, { Component } from 'react'
import "./changecurrency.css";
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
            let currencies = this.props.coins.map(([currency, type], index) =>
                <button onClick={() => this.props.changeCurrency(type)} key={index} className="currency-btn">
                    {currency}
                </button>
            )
            ReactDom.render(currencies, popUp);
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
            <div className="flex items-center justify-center gap-2">
                <div className="md:block hidden text-white currency-display">{this.props.currency}</div>
                <div ref={this.currency} onClick={(e) => this.handleToggle(e)} className="">
                    <div className="currency-btn-container flex items-center justify-center px-3 py-1 bg-zinc-800 rounded-md border-2 border-green-300">
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
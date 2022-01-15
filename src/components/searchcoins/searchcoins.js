import React, { Component } from 'react'
import "./searchcoins.css";
import EyeGlass from "../../images/eye-glass.svg";
import Axios from "axios";

export default class SearchCoins extends Component {
    constructor() {
        super();
        this.state = {
            coins: [],
            value: "",
            spinnerClass: "searchcoin-spinner-default"
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.clearCoinResults = this.clearCoinResults.bind(this);
    }
    handleSearch(e) {
        let input = e.target.value;
        let regex = /\s/;
        if (input.match(regex)) {
            input = input.split("").filter((item) => {
                if (item !== " ") {
                    return item;
                }
            }).join("");
        }
        this.setState({
            value: input
        })
        if (input.length == 1) {
            this.setState({
                spinnerClass: "searchcoin-spinner-active"
            })
            let url = `https://crypto-app-server.herokuapp.com/coins/${input}`
            Axios({
                method: "get",
                headers: {
                    "Content-Type": "application/json"
                },
                url: url
            }).then((result) => {
                let names = [];
                result.data.map((item) => {
                    names.push(item.id);
                })
                this.setState({
                    coins: names,
                    spinnerClass: "searchcoin-spinner-default"
                })
            }).catch((err) => {
                if (err) {
                    this.setState({
                        coins: []
                    })
                }
            })
        }

        else if (input.length == 0) {
            this.setState({
                coins: []
            })
        }
    }
    clearCoinResults() {
        this.setState({
            coins: [],
            value: ""
        })
    }
    render() {
        return (
            <div className='search-coin-container'>

                <svg version="1.1" x="0" y="0" viewBox="0 0 24 24" className={`${this.state.spinnerClass} w-5`}><g><g id="Layer_114" data-name="Layer 114">
                    <path d="m21 12a9 9 0 1 1 -3.84-7.36l-.11-.32a1 1 0 0 1 1.95-.64l1 3a1 1 0 0 1 -.14.9 1 1 0 0 1 -.86.42h-3a1 1 0 0 1 -1-1 1 1 0 0 1.71-.94 7 7 0 1 0 3.29 5.94 1 1 0 0 1 2 0z" fill="whitesmoke" data-original="#000000" /></g></g></svg>
                <form className="search-coin-form">
                    <input value={this.state.value} onChange={(e) => this.handleSearch(e)} className="search-coin-input" type="search" placeholder="search for crypto..." />
                </form>
                <div className="coin-results">

                    {this.state.coins ? this.state.coins.map((item, index) =>
                        <div className="coin-results-item" key={index}>
                            <button className="coin-results-btn" onClick={() => { this.props.changeCoin(item), this.clearCoinResults() }} key={index}>{item}</button>
                        </div>) : <div></div>}
                </div>
            </div>
        )
    }
}
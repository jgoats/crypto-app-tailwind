import React from "react";
import ReactDom from "react-dom";
import Axios from "axios";
import "../src/css/styles.css";
import Navigation from "../src/components/navigation/nav.js";
import Overview from "../src/components/overview/overview.js";
import Coins from "../src/components/coins/coins.js";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            currencyabbr: "usd",
            currency: "US dollar",
            historicalPrices: [],
            coins: [["bitcoin", "btc"], ["ethereum", "eth"], ["litecoin", "ltc"],
            ["bitcoin cash", "bch"], ["binance coin", "bnb"], ["eos", "eos"],
            ["xrp", "xrp"], ["stellar", "xlm"], ["chainlink", "link"], ["polkadot", "dot"],
            ["yearn finance", "yfi"], ["US dollar", "usd"], ["united arab emirates", "aed"],
            ["argentine peso", "ars"], ["australian dollar", "aud"], ["bangladeshi taka", "bdt"],
            ["bahrain idinar", "bhd"], ["bermudian dollar", "bmd"], ["brazilian real", "brl"],
            ["canadian dollar", "cad"], ["swiss franc", "chf"], ["chilean peso", "clp"],
            ["chinese yuan", "cny"], ["czech republic koruna", "czk"], ["danish krone", "dkk"],
            ["euro", "eur"], ["british pound sterling", "gbp"], ["hong kong dollar", "hkd"],
            ["hungarian forint", "huf"], [" indonesian Rupiah", "idr"], ["israeli new sheqel", "ils"],
            ["indian rupee", "inr"], ["Japanese yen", "jpy"], ["south korean won", "krw"],
            ["kuwaiti dinar", "kwd"], ["sri lankan rupee", "lkr"], ["myanma kyat", "mmk"],
            ["mexican peso", "mxn"], [" malaysian ringgit", "myr"], ["nigerian naira", "ngn"],
            ["norwegian krone", "nok"], ["new zealand dollar", "nzd"], ["philippine peso", "php"],
            ["pakistani rupee", "pkr"], ["polish zloty", "pln"], ["russian ruble", "rub"],
            ["saudi riyal", "sar"], [" swedish krona", "sek"], ["singapore dollar", "sgd"],
            ["thai baht", "thb"], ["turkish lira", "try"], ["new taiwan dollar", "twd"],
            ["ukrainian hryvnia", "uah"], ["venezuelan bolívar", "vef"], ["vietnamese dong", "vnd"],
            ["south african rand", "zar"], ["special drawing rights", "xdr"], ["silver ounce", "xag"],
            ["gold ounce", "xau"], ["bitstar", "bits"], [" satoshis", "sats"]],
            coin: "bitcoin",
            dates: [],
            lineGraphColor: [],
            totalvolumn: [],
            currentcoinprice: "",
            handleSpinner: "",
            wascurrencychanged: false,
            bgdisplay: "white",
            textdisplay: "black"
        }
        this.intersectionCallback = this.intersectionCallback.bind(this);
        this.handleDuration = this.handleDuration.bind(this);
        this.changeCurrency = this.changeCurrency.bind(this);
        this.setCurrency = this.setCurrency.bind(this);
        this.changeCoin = this.changeCoin.bind(this);
        this.changeDisplay = this.changeDisplay.bind(this);
    }
    intersectionCallback(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.className == "coin-header-container") {
                window.onscroll = function () {
                    if (document.getElementsByClassName("coin-header-container")[0].getBoundingClientRect().top <= 50) {
                        document.getElementsByClassName("coin-header-container")[0].style.position = "fixed";
                        document.getElementsByClassName("coin-header-container")[0].style.top = "3rem";
                        document.getElementsByClassName("coin-header-container")[0].style.width = "100%";
                    }
                }
            }
            else {
                document.getElementsByClassName("coin-header-container")[0].style.position = "static";

                console.log(entry.target.className);
            }
        });
    }

    changeCurrency(item) {
        this.setState({
            currencyabbr: item,
            wascurrencychanged: true
        })
        this.state.coins.forEach((coin) => {
            if (coin[1] == item) {
                this.setState({
                    currency: coin[0]
                })
            }
        })
        let url = `api.coingecko.com/api/v3/coins/${this.state.coin}/market_chart?vs_currency=${item}&days=1`;
        let newUrl = "https://" + url.replace(" ", "");
        this.setState({
            handleSpinner: "active-spinner"
        })
        Axios({
            method: "get",
            url: newUrl,
            headers: {
                "Content-Type": "application/json"
            }
        }).then((result) => {
            console.log(result.data);
            let prices = result.data.prices.map((price) => {
                return Math.floor(price[1])
            })
            this.setState({
                historicalPrices: prices,
                dates: prices,
                totalvolumn: [],
                handleSpinner: "default-spinner"
            })
            result.data.total_volumes.forEach((value, index) => {
                if ((index + 1) % 12 == 0) {
                    this.setState({
                        totalvolumn: [...this.state.totalvolumn, Math.floor(value[1])]
                    })
                }
            });
            if (this.state.historicalPrices[0] < this.state.historicalPrices[this.state.historicalPrices.length - 1]) {
                this.setState({
                    lineGraphColor: ["rgb(25,150,64)", "rgba(25,150,64, 0.6)"]
                })
            }
            else {
                this.setState({
                    lineGraphColor: ["rgb(206,18,18)", "rgba(206,18,18,0.2)"]
                })
            }
        }).catch((err) => {
            console.log(err)
        })
        let getCurrentPriceUrl = `api.coingecko.com/api/v3/simple/price?ids=${this.state.coin}&vs_currencies=${item}`;
        let newGetCurrentPriceUrl = "https://" + getCurrentPriceUrl.replace(" ", "");
        console.log(newGetCurrentPriceUrl);
        Axios({
            method: "get",
            url: newGetCurrentPriceUrl,
            headers: {
                "Content-Type": "application/json"
            }
        }).then((result) => {
            this.setState({
                currentcoinprice: result["data"][`${this.state.coin}`][`${this.state.currencyabbr}`]
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    handleDuration(num) {
        var url;
        var newUrl;
        switch (num) {
            case 24:
                url = `api.coingecko.com/api/v3/coins/${this.state.coin}/market_chart?vs_currency=${this.state.currencyabbr}&days=1`;
                newUrl = "https://" + url.replace(" ", "");
                this.setState({
                    handleSpinner: "active-spinner"
                })
                Axios({
                    method: "get",
                    url: newUrl,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then((result) => {
                    let prices = result.data.prices.map((price) => {
                        return Math.floor(price[1])
                    })
                    this.setState({
                        historicalPrices: prices,
                        dates: prices,
                        handleSpinner: "default-spinner"
                    })
                    if (this.state.historicalPrices[0] < this.state.historicalPrices[this.state.historicalPrices.length - 1]) {
                        this.setState({
                            lineGraphColor: ["rgb(25,150,64)", "rgba(25,150,64, 0.6)"]
                        })
                    }
                    else {
                        this.setState({
                            lineGraphColor: ["rgb(206,18,18)", "rgba(206,18,18,0.2)"]
                        })
                    }
                }).catch((err) => {
                    console.log(err)
                })
                break;
            case 7:
                url = `api.coingecko.com/api/v3/coins/${this.state.coin}/market_chart?vs_currency=${this.state.currencyabbr}&days=7`;
                newUrl = "https://" + url.replace(" ", "");
                this.setState({
                    handleSpinner: "active-spinner"
                })
                Axios({
                    method: "get",
                    url: newUrl,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then((result) => {
                    let prices = result.data.prices.map((price) => {
                        return Math.floor(price[1])
                    })
                    this.setState({
                        historicalPrices: prices,
                        dates: prices,
                        handleSpinner: "default-spinner"
                    })
                    if (this.state.historicalPrices[0] < this.state.historicalPrices[this.state.historicalPrices.length - 1]) {
                        this.setState({
                            lineGraphColor: ["rgb(25,150,64)", "rgba(25,150,64, 0.6)"]
                        })
                    }
                    else {
                        this.setState({
                            lineGraphColor: ["rgb(206,18,18)", "rgba(206,18,18,0.2)"]
                        })
                    }
                }).catch((err) => {
                    console.log(err)
                });
                break;
            case 30:
                url = `api.coingecko.com/api/v3/coins/${this.state.coin}/market_chart?vs_currency=${this.state.currencyabbr}&days=30`;
                newUrl = "https://" + url.replace(" ", "");
                this.setState({
                    handleSpinner: "active-spinner"
                })
                Axios({
                    method: "get",
                    url: newUrl,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then((result) => {
                    let prices = result.data.prices.filter((price, index) => {
                        if (index % 3 == 0) {
                            return price;
                        }
                    }).map((price) => {
                        return Math.floor(price[1]);
                    })
                    this.setState({
                        historicalPrices: prices,
                        dates: prices,
                        handleSpinner: "default-spinner"
                    })
                    if (this.state.historicalPrices[0] < this.state.historicalPrices[this.state.historicalPrices.length - 1]) {
                        this.setState({
                            lineGraphColor: ["rgb(25,150,64)", "rgba(25,150,64, 0.6)"]
                        })
                    }
                    else {
                        this.setState({
                            lineGraphColor: ["rgb(206,18,18)", "rgba(206,18,18,0.2)"]
                        })
                    }
                }).catch((err) => {
                    console.log(err)
                })
                break;
            case 180:
                url = `api.coingecko.com/api/v3/coins/${this.state.coin}/market_chart?vs_currency=${this.state.currencyabbr}&days=180`;
                newUrl = "https://" + url.replace(" ", "");
                this.setState({
                    handleSpinner: "active-spinner"
                })
                Axios({
                    method: "get",
                    url: newUrl,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then((result) => {
                    let prices = result.data.prices.map((price) => {
                        return Math.floor(price[1])
                    })
                    this.setState({
                        historicalPrices: prices,
                        dates: prices,
                        handleSpinner: "default-spinner"
                    })
                    if (this.state.historicalPrices[0] < this.state.historicalPrices[this.state.historicalPrices.length - 1]) {
                        this.setState({
                            lineGraphColor: ["rgb(25,150,64)", "rgba(25,150,64, 0.6)"]
                        })
                    }
                    else {
                        this.setState({
                            lineGraphColor: ["rgb(206,18,18)", "rgba(206,18,18,0.2)"]
                        })
                    }
                }).catch((err) => {
                    console.log(err)
                })
                break;
            case 365:
                url = `api.coingecko.com/api/v3/coins/${this.state.coin}/market_chart?vs_currency=${this.state.currencyabbr}&days=365`;
                newUrl = "https://" + url.replace(" ", "");
                this.setState({
                    handleSpinner: "active-spinner"
                })
                Axios({
                    method: "get",
                    url: newUrl,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then((result) => {
                    let prices = result.data.prices.map((price) => {
                        return Math.floor(price[1])
                    })
                    this.setState({
                        historicalPrices: prices,
                        dates: prices,
                        handleSpinner: "default-spinner"
                    })
                    if (this.state.historicalPrices[0] < this.state.historicalPrices[this.state.historicalPrices.length - 1]) {
                        this.setState({
                            lineGraphColor: ["rgb(25,150,64)", "rgba(25,150,64, 0.6)"]
                        })
                    }
                    else {
                        this.setState({
                            lineGraphColor: ["rgb(206,18,18)", "rgba(206,18,18,0.2)"]
                        })
                    }
                }).catch((err) => {
                    console.log(err)
                })
                break;
            case 1825:
                url = `api.coingecko.com/api/v3/coins/${this.state.coin}/market_chart?vs_currency=${this.state.currencyabbr}&days=1825`;
                newUrl = "https://" + url.replace(" ", "");
                this.setState({
                    handleSpinner: "active-spinner"
                })
                Axios({
                    method: "get",
                    url: newUrl,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then((result) => {
                    let prices = result.data.prices.filter((price, index) => {
                        if (index % 5 == 0) {
                            return price;
                        }
                    }).map((price) => {
                        return Math.floor(price[1]);
                    })
                    this.setState({
                        historicalPrices: prices,
                        dates: prices,
                        handleSpinner: "default-spinner"
                    })
                    if (this.state.historicalPrices[0] < this.state.historicalPrices[this.state.historicalPrices.length - 1]) {
                        this.setState({
                            lineGraphColor: ["rgb(25,150,64)", "rgba(25,150,64, 0.6)"]
                        })
                    }
                    else {
                        this.setState({
                            lineGraphColor: ["rgb(206,18,18)", "rgba(206,18,18,0.2)"]
                        })
                    }
                }).catch((err) => {
                    console.log(err)
                })
                break;
        }
    }
    setCurrency() {
        this.setState({
            wascurrencychanged: false
        })
    }
    changeCoin(coin) {
        this.setState({
            coin: coin,
            handleSpinner: "active-spinner"
        })
        let url = `api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${this.state.currencyabbr}&days=1`;
        let newUrl = "https://" + url.replace(" ", "");
        Axios({
            method: "get",
            url: newUrl,
            headers: {
                "Content-Type": "application/json"
            }
        }).then((result) => {
            let prices = result.data.prices.map((price) => {
                return Math.floor(price[1])
            })
            this.setState({
                historicalPrices: prices,
                dates: prices,
                totalvolumn: [],
                handleSpinner: "default-spinner"
            })
            result.data.total_volumes.forEach((value, index) => {
                if ((index + 1) % 12 == 0) {
                    this.setState({
                        totalvolumn: [...this.state.totalvolumn, Math.floor(value[1])]
                    })
                }
            });
            if (this.state.historicalPrices[0] < this.state.historicalPrices[this.state.historicalPrices.length - 1]) {
                this.setState({
                    lineGraphColor: ["rgb(25,150,64)", "rgba(25,150,64, 0.6)"]
                })
            }
            else {
                this.setState({
                    lineGraphColor: ["rgb(206,18,18)", "rgba(206,18,18,0.2)"]
                })
            }
        }).catch((err) => {
            console.log(err)
        })
        let getCurrentPriceUrl = `api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=${this.state.currencyabbr}`;
        let newGetCurrentPriceUrl = "https://" + getCurrentPriceUrl.replace(" ", "");
        console.log(newGetCurrentPriceUrl);
        Axios({
            method: "get",
            url: newGetCurrentPriceUrl,
            headers: {
                "Content-Type": "application/json"
            }
        }).then((result) => {
            this.setState({
                currentcoinprice: result["data"][`${coin}`][`${this.state.currencyabbr}`]
            })
        }).catch((err) => {
            console.log(err)
        })
    }
    changeDisplay(val) {
        if (val == "black") {
            this.setState({
                bgdisplay: "black",
                textdisplay: "white"
            })
        }
        else {
            this.setState({
                bgdisplay: "white",
                textdisplay: "black"
            })
        }
    }
    componentDidMount() {
        let url = `api.coingecko.com/api/v3/coins/${this.state.coin}/market_chart?vs_currency=${this.state.currencyabbr}&days=1`;
        let newUrl = "https://" + url.replace(" ", "");
        this.setState({
            handleSpinner: "active-spinner"
        })
        Axios({
            method: "get",
            url: newUrl,
            headers: {
                "Content-Type": "application/json"
            }
        }).then((result) => {
            let prices = result.data.prices.map((price) => {
                return Math.floor(price[1])
            })
            this.setState({
                historicalPrices: prices,
                dates: prices,
                totalvolumn: [],
                handleSpinner: "default-spinner"
            })
            result.data.total_volumes.map((value, index) => {
                if ((index + 1) % 12 == 0) {
                    this.setState({
                        totalvolumn: [...this.state.totalvolumn, Math.floor(value[1])]
                    })
                }
            });
            for (let i = 0; i < this.state.totalvolumn.length; i++) {
                if (this.state.totalvolumn[i] > this.state.totalvolumn[i + 1]) {
                    this.setState({
                        bargraphborder: [...this.state.bargraphborder, "rgba(206,18,18,0.6)"],
                        bargraphcolor: [...this.state.bargraphcolor, "rgba(206,18,18,0.6)"]
                    })
                }
                else {
                    this.setState({
                        bargraphborder: [...this.state.bargraphborder, "#5ab74b"],
                        bargraphcolor: [...this.state.bargraphcolor, "rgba(90,183,75,0.6)"]
                    })
                }
            }
            if (this.state.historicalPrices[0] < this.state.historicalPrices[this.state.historicalPrices.length - 1]) {
                this.setState({
                    lineGraphColor: ["rgb(25,150,64)", "rgba(25,150,64, 0.6)"]
                })
            }
            else {
                this.setState({
                    lineGraphColor: ["rgb(206,18,18)", "rgba(206,18,18,0.2)"]
                })
            }
        }).catch((err) => {
            console.log(err)
        })
        let getCurrentPriceUrl = `api.coingecko.com/api/v3/simple/price?ids=${this.state.coin}&vs_currencies=${this.state.currencyabbr}`;
        let newGetCurrentPriceUrl = "https://" + getCurrentPriceUrl.replace(" ", "");
        Axios({
            method: "get",
            url: newGetCurrentPriceUrl,
            headers: {
                "Content-Type": "application/json"
            }
        }).then((result) => {
            this.setState({
                currentcoinprice: result["data"][`${this.state.coin}`][`${this.state.currencyabbr}`]
            })
        }).catch((err) => {
            console.log(err)
        })
    }
    render() {
        return (
            <div>
                <Navigation
                    changeDisplay={this.changeDisplay}
                    changeCoin={this.changeCoin}
                    handleSpinner={this.state.handleSpinner}
                    changeCurrency={this.changeCurrency}
                    currency={this.state.currency}
                    currencyabbr={this.state.currencyabbr}
                    coins={this.state.coins}
                    changeDisplay={this.changeDisplay} />
                <Overview
                    handleDuration={this.handleDuration}
                    price={this.state.historicalPrices}
                    handleSpinner={this.state.handleSpinner}
                    graphColor={this.state.lineGraphColor}
                    graphlabels={this.state.dates}
                    totalvolumn={this.state.totalvolumn}
                    coin={this.state.coin}
                    currentcoinprice={this.state.currentcoinprice}
                    bgdisplay={this.state.bgdisplay}
                    textdisplay={this.state.textdisplay}
                    intersectionCallback={this.intersectionCallback} />
                <Coins
                    wascurrencychanged={this.state.wascurrencychanged}
                    setCurrency={this.state.setCurrency}
                    currencyabbr={this.state.currencyabbr}
                    bgdisplay={this.state.bgdisplay}
                    textdisplay={this.state.textdisplay}
                    intersectionCallback={this.intersectionCallback} />
            </div>
        )
    }
}

ReactDom.render(React.createElement(App), document.getElementById("app"));
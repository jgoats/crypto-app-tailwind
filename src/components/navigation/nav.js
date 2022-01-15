import React from "react";
import "./nav.css";
import "../../../src/css/styles.css";
import Light from "../../images/brightness.svg";
import Dark from "../../images/night-mode.svg";
import SearchCoins from "../searchcoins/searchcoins.js";
import ChangeCurrency from "../changecurrency/changecurrency.js";

export default class Navigation extends React.Component {
    constructor() {
        super();
        this.state = {
            searchbar: "",
            searchbarMode: "searchbar",
            displayMode: Light,
            currency: "usd",
        }
        this.handleSearchbar = this.handleSearchbar.bind(this);
        this.toggleDisplayMode = this.toggleDisplayMode.bind(this);
    }
    handleSearchbar(e) {
        console.log(e.target.value)
        this.setState({
            searchbar: e.target.value
        })
    }
    toggleDisplayMode() {
        if (this.state.displayMode === Light) {
            this.setState({
                displayMode: Dark,
                searchbarMode: "searchbar-dark"
            })
            this.props.changeDisplay("black");
        }
        else {
            this.setState({
                displayMode: Light,
                searchbarMode: "searchbar"
            })
            this.props.changeDisplay("white");
        }
    }
    handleHamburgerMenu() {
        this.state.hamburgerContent === "hamburgerContent" ? this.setState({
            hamburgerContent: "hamburgerContent-active"
        }) : this.setState({
            hamburgerContent: "hamburgerContent"
        })
    }
    /* <input onChange={(e) => this.handleSearchbar(e)} type="text" value={this.state.searchbar} className={`${this.state.searchbarMode} w-1/2`} /> */
    render() {
        return (
            <div>
                <div className="sm:gap-12 gap-3 nav-container-main w-full bg-zinc-900 flex flex-row items-center">
                    <div className="sm:flex hidden gap-4 w-1/4 justify-start">
                        <div className="nav-coins px-3 py-1 rounded-md text-white ml-12">Coins</div>
                        <div className="px-3 py-1 rounded-md text-white">Portfolio</div>
                    </div>
                    <div className="w-1/4 sm:hidden block"></div>
                    <div className="flex items-center w-full justify-end gap-3">
                        <SearchCoins
                            changeCoin={this.props.changeCoin}
                            handleSpinner={this.props.handleSpinner} />
                        <ChangeCurrency
                            changeCurrency={this.props.changeCurrency}
                            currency={this.props.currency}
                            currencyabbr={this.props.currencyabbr}
                            coins={this.props.coins} />
                        <div onClick={this.toggleDisplayMode} className="display-mode-container text-white mr-3"><img className="display-mode" src={this.state.displayMode} /></div>
                    </div>

                </div>
            </div>
        )
    }
}
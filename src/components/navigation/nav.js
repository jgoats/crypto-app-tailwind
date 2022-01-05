import React from "react";
import "./nav.css";
import "../../../src/css/styles.css";
import Light from "../../images/brightness.svg";
import Dark from "../../images/night-mode.svg";

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
        this.state.displayMode === Light ? this.setState({
            displayMode: Dark,
            searchbarMode: "searchbar-dark"
        }) : this.setState({
            displayMode: Light,
            searchbarMode: "searchbar"
        })
    }
    handleHamburgerMenu() {
        this.state.hamburgerContent === "hamburgerContent" ? this.setState({
            hamburgerContent: "hamburgerContent-active"
        }) : this.setState({
            hamburgerContent: "hamburgerContent"
        })
    }
    render() {
        return (
            <div>
                <div className="sm:gap-12 gap-3 nav-container-main w-full bg-black flex flex-row items-center">
                    <div className="sm:flex hidden gap-4 w-full justify-start">
                        <div className="nav-coins px-3 py-1 rounded-md text-white ml-12">Coins</div>
                        <div className="px-3 py-1 rounded-md text-white">Portfolio</div>
                    </div>
                    <div className="flex items-center w-full justify-end gap-3">
                        <input onChange={(e) => this.handleSearchbar(e)} type="text" value={this.state.searchbar} className={`${this.state.searchbarMode} w-1/2`} />
                        <button className="currency-btn rounded-md">{this.state.currency}</button>
                        <div onClick={this.toggleDisplayMode} className="display-mode-container text-white mr-3"><img className="display-mode" src={this.state.displayMode} /></div>
                    </div>

                </div>
            </div>
        )
    }
}
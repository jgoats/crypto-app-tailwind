import React, { Component } from 'react';
import "./hamburger.css";
import "../../css/styles.css";

export default class Hamburger extends Component {
    constructor() {
        super();
        this.state = {
            hamburgerContent: "hamburgerContent"
        }
        this.handleHamburgerMenu = this.handleHamburgerMenu.bind(this);
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
                <div onClick={this.handleHamburgerMenu} className="hamburger-container md:hidden flex flex-col items-center justify-center">
                    <div className="hamburger-item"></div>
                    <div className="hamburger-item"></div>
                    <div className="hamburger-item"></div>
                </div>
                <div className={`md:hidden flex flex-col items-center justify-around ${this.state.hamburgerContent}`}>
                    <div className="hamburgerContent-item text-white text-3xl">Coins</div>
                    <div className="hamburgerContent-item text-white text-3xl">Portfolio</div>
                </div>
            </div>
        )
    }
}

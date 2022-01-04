import React, { Component } from 'react';
import "./portfoliopage.scss";
import Navigation from "../navigation/navigation.js";
import PortfolioPopup from "../portfoliopopup/portfoliopopup.js";


export default class PortfolioPage extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <main>
                    <button className="portfoliopage-btn">
                        Add Asset
                    </button>
                    <PortfolioPopup />
                </main>
            </div>
        )
    }
}

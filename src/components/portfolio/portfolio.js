import React, { Component } from 'react'
import "./portfolio.css";
import { Link } from "react-router-dom";

export default class PortfolioBtn extends Component {
    render() {
        return (
            <div>
                <Link className="view-portfolio-btn-default" to="/portfolio">Portfolio </Link>
            </div>
        )
    }
}

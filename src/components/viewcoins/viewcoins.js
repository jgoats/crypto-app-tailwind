import React, { Component } from 'react';
import "../../css/styles.css";
import "./viewcoins.css";
import { Link } from "react-router-dom";

export default class ViewCoins extends Component {
    render() {
        return (
            <div>
                <Link to="/" className="">Coins</Link>
            </div>
        )
    }
}

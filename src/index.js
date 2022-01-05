import React from "react";
import ReactDom from "react-dom";
import Axios from "axios";
import "../src/css/styles.css";
import Navigation from "../src/components/navigation/nav.js";
import Hamburger from "../src/components/hamburger/hamburger.js";

export default class App extends React.Component {
    constructor() {
        super();

    }
    render() {
        return (
            <div>
                <Navigation />
                <Hamburger />
            </div>
        )
    }
}

ReactDom.render(React.createElement(App), document.getElementById("app"));
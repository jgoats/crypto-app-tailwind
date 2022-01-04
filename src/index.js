import React from "react";
import ReactDom from "react-dom";
import Axios from "axios";
import "../src/css/styles.css";

export default class App extends React.Component {
    constructor() {
        super()

    }
    render() {
        return (
            <div>

            </div>
        )
    }
}

ReactDom.render(React.createElement(App), document.getElementById("app"));
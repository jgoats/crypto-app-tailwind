import React from 'react';
import "./maingraph.css";
import "../../css/styles.css";
import { Line } from "react-chartjs-2";
import ReactDom from "react-dom";
import CoinPrice from "../coinprice/coinprice.js";
import CurrentDate from "../currentdate/currentdate.js";

export default class Maingraph extends React.Component {
    constructor() {
        super();
        this.state = {

        }
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        let customLabel = document.getElementsByClassName("custom-label")[0];
        document.getElementsByClassName("graph-btn-container")[0].firstChild.classList.add("btn-active");
        let labels = [];
        for (let i = 24; i > 0; i--) {

            let label = React.createElement(
                "div",
                { key: i },
                i
            );
            labels.push(label);
        }
        ReactDom.render(labels, customLabel);
        this.props.handleDuration(24);
    }
    handleClick(str, event) {
        let parent = event.target.parentNode.children;
        let customLabel = event.target.parentNode.previousElementSibling;
        let labels = [];
        for (let i = 0; i < parent.length; i++) {
            if (event.target == parent[i]) {
                event.target.classList.add("btn-active");
            }
            else {
                parent[i].classList.remove("btn-active");
            }
        }
        switch (str) {
            case "yesterday":
                ReactDom.unmountComponentAtNode(customLabel);
                labels = [];
                for (let i = 24; i > 0; i--) {
                    let label = React.createElement(
                        "div",
                        { key: i },
                        i
                    );
                    labels.push(label);
                }
                ReactDom.render(labels, customLabel);
                this.props.handleDuration(24);
                break;
            case "last week":
                ReactDom.unmountComponentAtNode(customLabel);
                labels = [];
                for (let i = 7; i > 0; i--) {
                    let label = React.createElement(
                        "div",
                        { key: i },
                        i
                    );
                    labels.push(label);
                }
                ReactDom.render(labels, customLabel);
                this.props.handleDuration(7);
                break;
            case "last month":
                ReactDom.unmountComponentAtNode(customLabel);
                labels = [];
                for (let i = 30; i > 0; i--) {
                    let label = React.createElement(
                        "div",
                        { key: i },
                        i
                    );
                    labels.push(label);
                }
                ReactDom.render(labels, customLabel);
                this.props.handleDuration(30);
                break;
            case "last 6 months":
                ReactDom.unmountComponentAtNode(customLabel);
                labels = [];
                for (let i = 6; i > 0; i--) {
                    let label = React.createElement(
                        "div",
                        { key: i },
                        i
                    );
                    labels.push(label);
                }
                ReactDom.render(labels, customLabel);
                this.props.handleDuration(180);
                break;
            case "last year":
                ReactDom.unmountComponentAtNode(customLabel);
                labels = [];
                for (let i = 12; i > 0; i--) {
                    let label = React.createElement(
                        "div",
                        { key: i },
                        i
                    );
                    labels.push(label);
                }
                ReactDom.render(labels, customLabel);
                this.props.handleDuration(365);
                break;
            case "last 5 years":
                ReactDom.unmountComponentAtNode(customLabel);
                labels = [];
                for (let i = 5; i > 0; i--) {
                    let label = React.createElement(
                        "div",
                        { key: i },
                        i
                    );
                    labels.push(label);
                }
                ReactDom.render(labels, customLabel);
                this.props.handleDuration(1825);
                break;
        }
    }
    render() {
        const data = canvas => {
            const ctx = canvas.getContext("2d");
            const gradient = ctx.createLinearGradient(0, 0, 100, 0);
            const labels = this.props.price;
            return {
                backgroundColor: canvas,
                labels,
                datasets: [
                    {
                        data: this.props.price,
                        borderWidth: 1,
                        fill: true,
                        borderColor: this.props.graphColor[0],
                        backgroundColor: this.props.graphColor[1],
                        pointRadius: 0,
                        showLine: true,
                        pointHitRadius: 20,
                        lineTension: 0.1,
                    }
                ]
            };
        };
        return (
            <div className="line-graph-main-container lg:w-1/2 w-full h-1/2">
                <div className="coin-info-container flex sm:gap-20 gap-10 justify-center w-full">
                    <h1 className="font-semibold">{this.props.coin}</h1>
                    <CoinPrice currentcoinprice={this.props.currentcoinprice} />
                    <CurrentDate />
                </div>
                <svg version="1.1" x="0" y="0" viewBox="0 0 24 24" className={`${this.props.handleSpinner}`}><g><g id="Layer_114" data-name="Layer 114">
                    <path d="m21 12a9 9 0 1 1 -3.84-7.36l-.11-.32a1 1 0 0 1 1.95-.64l1 3a1 1 0 0 1 -.14.9 1 1 0 0 1 -.86.42h-3a1 1 0 0 1 -1-1 1 1 0 0 1.71-.94 7 7 0 1 0 3.29 5.94 1 1 0 0 1 2 0z" fill={`${this.props.textdisplay}`} data-original="#000000" /></g></g></svg>
                <div className="line-graph">
                    <Line options={{
                        maintainAspectRatio: false,
                        backgroundColor: "white",
                        scales: {
                            x: {
                                ticks: {
                                    display: false,
                                }
                            }
                        },
                        plugins: {
                            legend: { display: false },
                        }
                    }} data={data} />
                </div>
                <div style={{ backgroundColor: `${this.props.bgdisplay}`, color: `${this.props.textdisplay}` }} className={`font-semibold custom-label flex w-full justify-around`}>
                </div>
                <div className={`graph-btn-container gap-6`}>
                    <button className={`graph-btn`} onClick={(e) => this.handleClick("yesterday", e)}>1d</button>
                    <button className={`graph-btn`} onClick={(e) => this.handleClick("last week", e)}>1w</button>
                    <button className={`graph-btn`} onClick={(e) => this.handleClick("last month", e)}>1m</button>
                    <button className={`graph-btn`} onClick={(e) => this.handleClick("last 6 months", e)}>6m</button>
                    <button className={`graph-btn`} onClick={(e) => this.handleClick("last year", e)}>1y</button>
                    <button className={`graph-btn`} onClick={(e) => this.handleClick("last 5 years", e)}>5y</button>
                </div>
            </div>
        );
    }


}

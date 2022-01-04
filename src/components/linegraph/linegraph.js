import React from 'react';
import "./linegraph.scss";
import { Line } from "react-chartjs-2";
import ReactDom from "react-dom";


export default class LineGraph extends React.Component {
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
        let customLabel = event.target.parentNode.parentNode.childNodes[2];
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
                backgroundColor: gradient,
                labels,
                datasets: [
                    {
                        data: this.props.price,
                        borderWidth: 1,
                        fill: true,
                        borderColor: this.props.graphColor[0],
                        backgroundColor: this.props.graphColor[1],
                        pointRadius: 0
                    }
                ]
            };
        };
        return (
            <div className="line-graph">
                <div style={{
                    position: "absolute",
                    height: "200px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <svg version="1.1" x="0" y="0" viewBox="0 0 24 24" className={this.props.handleSpinner}><g><g id="Layer_114" data-name="Layer 114">
                        <path d="m21 12a9 9 0 1 1 -3.84-7.36l-.11-.32a1 1 0 0 1 1.95-.64l1 3a1 1 0 0 1 -.14.9 1 1 0 0 1 -.86.42h-3a1 1 0 0 1 -1-1 1 1 0 0 1.71-.94 7 7 0 1 0 3.29 5.94 1 1 0 0 1 2 0z" fill="whitesmoke" data-original="#000000" /></g></g></svg>
                </div>
                <Line options={{
                    maintainAspectRatio: false,
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
                <div className="custom-label">
                </div>
                <div className="graph-btn-container">
                    <button className="graph-btn" onClick={(e) => this.handleClick("yesterday", e)}>Last 24 Hours</button>
                    <button className="graph-btn" onClick={(e) => this.handleClick("last week", e)}>Last Week</button>
                    <button className="graph-btn" onClick={(e) => this.handleClick("last month", e)}>Last 30 Days</button>
                    <button className="graph-btn" onClick={(e) => this.handleClick("last 6 months", e)}>Last 6 Months</button>
                    <button className="graph-btn" onClick={(e) => this.handleClick("last year", e)}>Last Year</button>
                    <button className="graph-btn" onClick={(e) => this.handleClick("last 5 years", e)}>Last 5 Years</button>
                </div>
            </div>
        );
    }
}

import React, { Component } from 'react';
import "./overview.css";
import "../../css/styles.css";
import MainGraph from "../maingraph/maingraph.js";
import BarGraph from "../bargraph/bargraph.js";

export default class Overview extends Component {
    constructor() {
        super();
        this.state = {
            graphColor: ["rgb(25, 150, 64)", "rgba(25, 150, 64, 0.2)"],
        }
        this.cryptoheader = React.createRef();
    }
    componentDidMount() {
        let options = {
            root: null,
            rootMargin: "0px",
            threshold: 1
        }
        let observer = new IntersectionObserver(this.props.intersectionCallback, options);
        let target = this.cryptoheader.current;
        observer.observe(target);
    }
    render() {
        return (
            <div style={{ backgroundColor: `${this.props.bgdisplay}`, color: `${this.props.textdisplay}` }}
                className={`overview-container md:p-10 p-2 w-full relative`}>
                <h1 className={`overview-heading`}>Overview</h1>
                <div className="flex lg:flex-row flex-col items-center justify-center gap-20">
                    <MainGraph
                        handleDuration={this.props.handleDuration}
                        price={this.props.price}
                        handleSpinner={this.props.handleSpinner}
                        graphColor={this.props.graphColor}
                        graphlabels={this.props.dates}
                        coin={this.props.coin}
                        currentcoinprice={this.props.currentcoinprice}
                        bgdisplay={this.props.bgdisplay}
                        textdisplay={this.props.textdisplay} />
                    <BarGraph
                        coin={this.props.coin}
                        totalvolumn={this.props.totalvolumn} />
                </div>
                <h1 ref={this.cryptoheader} className={`overview-heading`}>Top 20 Crypro Currencies</h1>
            </div>
        )
    }
}

import React from 'react';
import ReactDom from "react-dom";
import "./bargraph.css";
import { Bar } from "react-chartjs-2";




export default class BarGraph extends React.Component {
    componentDidMount() {
        let customLabel = document.getElementsByClassName("custom-label-bar")[0];
        let customLabels = [];
        for (let i = 24; i > 0; i--) {
            let label = React.createElement(
                "div",
                { key: i },
                i
            );
            customLabels.push(label);
        }
        ReactDom.render(customLabels, customLabel);
    }
    render() {
        const labels = [];
        for (let i = 1; i <= 24; i++) {
            labels.push("");
        }

        const data = canvas => {
            const ctx = canvas.getContext("2d");
            const gradient = ctx.createLinearGradient(0, 0, 100, 0);
            return {
                backgroundColor: gradient,
                labels,
                datasets: [
                    {
                        data: this.props.totalvolumn,
                        borderWidth: 2,
                        fill: true,
                        borderColor: "limegreen",
                        backgroundColor: "limegreen",
                    }
                ]
            };
        };
        return (
            <div className="line-graph">
                <Bar options={{
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
                <div className="custom-label-bar"></div>
            </div>
        );
    }
}

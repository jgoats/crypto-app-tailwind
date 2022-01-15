import React from 'react';
import ReactDom from "react-dom";
import "./bargraph.css";
import { Bar } from "react-chartjs-2";




export default class BarGraph extends React.Component {
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
                        borderColor: this.props.bargraphborder,
                        backgroundColor: this.props.bargraphcolor,
                        borderRadius: 20
                    }
                ]
            };
        };
        return (
            <div className="lg:w-1/2 bargraph-main-container w-full">
                <div className="flex items-center gap-20 justify-center w-full">
                    <h1 className="font-semibold">{this.props.coin}</h1>
                    <h1 className="font-light">{`Volumn (24h)`}</h1>
                </div>
                <div className="bargraph">
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
                </div>
            </div>
        );
    }
}

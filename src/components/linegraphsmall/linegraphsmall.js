import React, { Component } from 'react';
import { Line } from "react-chartjs-2";
import "./linegraphsmall.css";

export default class LineGraphSmall extends Component {
    render() {
        const data = canvas => {
            const ctx = canvas.getContext("2d");
            const gradient = ctx.createLinearGradient(0, 0, 100, 0);
            const labels = this.props.price;
            return {
                backgroundColor: gradient,
                labels: labels,
                datasets: [
                    {
                        data: this.props.price,
                        borderWidth: 1,
                        fill: false,
                        pointRadius: 0,
                        borderColor: this.props.color
                    }
                ]
            };
        };

        return (
            <div style={{
                height: "100px"
            }}>
                <Line data={data} options={{
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            grid: {
                                display: false,
                                drawTicks: false,
                                borderWidth: 0
                            },
                            ticks: {
                                display: false,
                            }
                        },
                        x: {
                            grid: {
                                display: false,
                                drawTicks: false,
                                borderWidth: 0
                            },
                            ticks: {
                                display: false,
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                    }
                }} />
            </div>

        )
    }
}
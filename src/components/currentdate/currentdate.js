import React, { Component } from 'react'
import "./currentdate.css";

export default class CurrentDate extends Component {
    render() {
        return (
            <p className="current-date">
                {new Date().toLocaleDateString()}
            </p>
        )
    }
}

import React, { Component } from 'react'
import "./currentdate.scss";

export default class CurrentDate extends Component {
    render() {
        return (
            <p className="current-date">
                {new Date().toLocaleDateString()}
            </p>
        )
    }
}

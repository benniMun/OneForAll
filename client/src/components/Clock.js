import React, { Component } from 'react';

export default class Clock extends Component {
    
    constructor() {
        super();

        this.state = {
            date: {
                day: "", month: "", year: "",
            },
            time: {
                h: "", m: "", s: "",
            }
        };
    };

    componentDidMount() {
        this.startTime();
    };

    startTime () {
        let today = new Date();

        this.setState({
            date: {
                day: this.doubleDigitify(today.getDate()),
                month: this.doubleDigitify(today.getMonth() + 1),
                year: today.getFullYear() % 100,
            },
            time: {
                h: this.doubleDigitify(today.getHours()),
                m: this.doubleDigitify(today.getMinutes()),
                s: this.doubleDigitify(today.getSeconds()),
            },
        });

        setTimeout(() => {
            this.startTime()
        }, 500);
    }

    doubleDigitify(i) {
        return (i < 10) ? "0" + i : i;
    }

    render() {
        return (
            <div className="clock">
                <p className="time">{this.state.time.h}:{this.state.time.m}:{this.state.time.s}</p>
                <p className="date">{this.state.date.day}.{this.state.date.month}.{this.state.date.year}</p>
            </div>
        );
    };
}
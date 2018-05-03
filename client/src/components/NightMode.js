import React, { Component } from 'react';

export default class NightMode extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            nightTheme: false,
        };
    };

    componentDidMount() {
        this.checkForNightTime();
    };

    checkForNightTime() {
        const time = new Date().getHours();
        let app = document.getElementById('App');

        if (8 <= time && time < 20) {
            if (app.classList.contains("nightTheme")) {
                this.onDayNightClick();
            }
        } else {
            if (app.classList.contains("dayTheme")) {
                this.onDayNightClick();
            }
        }

        setTimeout(() => {
            this.checkForNightTime();
        }, 600000);
    };

    onDayNightClick() {
        let app = document.getElementById('App');
    
        if (this.state.nightTheme) {
            app.className = 'App dayTheme';
            this.setState({
                nightTheme: false,
            });
            this.props.onThemeChange("dayTheme");  
        } else {
            app.className = 'App nightTheme';
            this.setState({
                nightTheme: true,
            });
            this.props.onThemeChange("nightTheme");  
        };
    };

    chooseImage() {
        if(this.state.nightTheme) {
            return require('../images/DayNight_dark.png')
        } else {
            return require('../images/DayNight.png')
        }
    };

    render() {
        let dayNightImage = this.chooseImage();

        return (
            <button className="dayNightToggleButton" onClick={this.onDayNightClick.bind(this)} >
                <img src={dayNightImage} alt="DayNight" />
            </button>
        );
    };
};
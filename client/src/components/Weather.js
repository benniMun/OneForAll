import React, { Component } from 'react';

const API_KEY = "a249fe1263fedad07c70a9be435be060";

export default class Weather extends Component {

  constructor() {
    super();

    this.state = {
      weather: {
        temp: "",
        conditions: "",
        maxTemp: "",
        minTemp: "",
      }
    }
  };

  componentDidMount() {
    this.startWeather();
  };

  startWeather() {
    this.getLocation().then(
      position => this.getWeather(position),
      locationError => this.showLocationError(locationError)
    );

    setTimeout(() => {
      this.startWeather();
    }, 600000);
  }
  
  getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => resolve(position),
          error => reject(error)
        );
      } else {
        reject("Geolocation is not supported by this browser.");
      };
    });

    
  };

  showLocationError(error) {
    console.log("showLocationError: ");
    console.log(error);
  };

  getWeather(position) {
    return new Promise((resolve, reject) => {

      let request_url = "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&APPID=" + API_KEY;
      request_url += "&units=metric";

      fetch(request_url)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          this.showWeatherError("Error (Status: " + res.status + ") while fetching data from: " + request_url);
        };
      }).then(weatherJson => {
        this.displayWeather(weatherJson);
      })
      .catch(error => this.showWeatherError(error));
    });
  };

  displayWeather(weather) {
    this.setState({
      weather: {
        temp: Math.round(weather.main.temp),
        conditions: weather.weather[0].main,
        maxTemp: weather.main.temp_max,
        minTemp: weather.main.temp_min,
      }
    });
    
  }

  showWeatherError(error) {
    console.log("showWeatherError: ");
    console.log(error);
  };

  setConditionsImage() {
    if (this.props.theme === "nightTheme") {
      switch (this.state.weather.conditions) {
        case "Thunderstorm":
          return require('../images/thunderstorm_dark.png');
        case "Drizzle":
          return require('../images/drizzle_dark.png');
        case "Rain":
          return require('../images/rain_dark.png');
        case "Snow":
          return require('../images/snow_dark.png');
        case "Atmosphere":
          return require('../images/atmosphere_dark.png');
        case "Clear":
          return require('../images/clear_dark.png');
        case "Clouds":
          return require('../images/clouds_dark.png');
        default: 
          return require('../images/default_dark.png');
      }
    } else {
      switch (this.state.weather.conditions) {
        case "Thunderstorm":
          return require('../images/thunderstorm.png');
        case "Drizzle":
          return require('../images/drizzle.png');
        case "Rain":
          return require('../images/rain.png');
        case "Snow":
          return require('../images/snow.png');
        case "Atmosphere":
          return require('../images/atmosphere.png');
        case "Clear":
          return require('../images/clear.png');
        case "Clouds":
          return require('../images/clouds.png');
        default: 
          return require('../images/default.png');
      }
    }
  };

  render() {
    let conditionsImage = this.setConditionsImage();

    // minmax gerade auf display: none;

    return (
      <div className="weather">
        <img className="currentConditions" src={conditionsImage} alt="DayNight" />
        <p className="currentTemp">{this.state.weather.temp}°C</p>
        <div className="minmaxWrapper">
          <p className="maxTemp">{this.state.weather.maxTemp}°C</p>
          <p className="minTemp">{this.state.weather.minTemp}°C</p>
        </div>
      </div>
    );
  }
}
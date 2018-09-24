import React, { Component, Fragment } from 'react';
import WeatherList from './WeatherList';

class FetchWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      cityData: {},
      weatherData: []
    };

    this.fetchTheWeather = this.fetchTheWeather.bind(this);
    this.parseWeatherData = this.parseWeatherData.bind(this);
  }

  componentWillMount() {
    this.fetchTheWeather();
  }

  fetchTheWeather() {
    // api key generated for TreeTop Commons code exercise
    // weather icons used are by kevin Aguilar @kevinttob
    const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${
      process.env.REACT_APP_API_KEY
    }`;
    const PDX = 5746545;
    const url = `${ROOT_URL}&id=${PDX}&units=imperial`;

    if (this.state.isLoading) {
      return;
    }

    this.setState({ isLoading: true });

    fetch(url)
      .then(res => res.json())
      .then(json => {
        this.setState({ cityData: json.city });
        this.setState({ weatherData: this.parseWeatherData(json.list) });
        this.setState({ isLoading: false });
      })
      .catch(err => console.error(`An error occurred: ${err}`));
  }

  parseWeatherData(list = []) {
    // weather data comes from api as a list of 40 3-hour time chunks.
    // lets group them into an array of days for easier consumption

    if (!list.length) {
      return list;
    }

    return list.reduce((acc, curr) => {
      let currDt = new Date(curr.dt * 1000);
      let localDt = currDt.toLocaleDateString();

      let found = acc.find(obj => {
        return obj.dt === localDt;
      });

      if (found) {
        // found the date obj, add the current chunk of time to its data array
        found.list.push(curr);
        return acc;
      }

      // did not find the date obj, push on a new date obj and add the current chunk of time to its data array
      acc.push({
        dt: localDt,
        list: [curr]
      });
      return acc;
    }, []);
  }

  render() {
    const { weatherData, isLoading } = this.state;

    return (
      <Fragment>
        <WeatherList list={weatherData} isLoading={isLoading} />
      </Fragment>
    );
  }
}

export default FetchWeather;

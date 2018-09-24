import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import WeatherItem from './WeatherItem';
import Loading from './Loading';
import '../styles/WeatherList.css';

const WeatherList = props => {
  const { list, isLoading } = props;

  return (
    <Fragment>
      <h2 className="forecast-title">5 Day Forecast</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <ul className="weather">
          {list &&
            list.map(day => {
              return <WeatherItem key={day.dt} day={day} />;
            })}
        </ul>
      )}
    </Fragment>
  );
};

WeatherList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  list: PropTypes.array
};

export default WeatherList;

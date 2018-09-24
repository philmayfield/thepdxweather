import React from 'react';
import PropTypes from 'prop-types';
import TimeChunk from './TimeChunk';
import '../styles/WeatherItem.css';

const WeatherItem = props => {
  const { day } = props;
  const { list } = day;
  const date = new Date(`${day.dt} `).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
  const [dayWord, dayNum] = date.split(',');

  return (
    <li className="weather__day">
      <h3 className="weather__day-title">
        <span className="weather__day-word">{dayWord}</span>
        <span className="weather__day-num">{dayNum}</span>
      </h3>
      <ul className="weather__chunk">
        {list && list.map(chunk => <TimeChunk key={chunk.dt} chunk={chunk} />)}
      </ul>
    </li>
  );
};

WeatherItem.propTypes = {
  day: PropTypes.object.isRequired
};

export default WeatherItem;

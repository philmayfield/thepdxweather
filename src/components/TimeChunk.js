import React from 'react';
import PropTypes from 'prop-types';
import '../styles/TimeChunk.css';

const TimeChunk = props => {
  const { chunk } = props;
  const { main, weather, wind, rain, snow } = chunk;
  const time = new Date(chunk.dt * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit'
  });
  const [hour, when] = time.split(' ');
  const showRain = rain && rain['3h'] && rain['3h'].toFixed(1) > 0;
  const showSnow = snow && snow['3h'] && snow['3h'].toFixed(1) > 0;

  return (
    <li className="weather__time-chunk">
      <div className="weather__info">
        <h4 className="weather__time">
          <span className="weather__time-hour">{hour}</span>
          <span className="weather__time-when">{when}</span>
        </h4>
        {/* according to api each list item may have more than one weather description */}
        {weather.map(item => (
          <img
            key={item.id}
            className="weather__icon"
            src={`http://philmayfield.com/img/open-weather-map-icons/${
              item.icon
            }.png`}
            alt={`Icon for ${item.description}`}
          />
        ))}
        <div className="weather__temp">
          {Math.round(main.temp)}
          &deg;
        </div>
      </div>
      <div className="weather__details">
        <div className="weather__wind">
          <span
            className="weather__wind-indicator weather__indicator"
            style={{ transform: `rotate(${wind.deg}deg)` }}
          />
          {Math.round(wind.speed)} mph
        </div>
        <div className="weather__humidity">{main.humidity}% rh</div>
        <div className="weather__pressure">{Math.round(main.pressure)} hPa</div>
        {showRain && (
          <div className="weather__rain">
            <span className="weather__drop-indicator weather__indicator" />
            {rain['3h'].toFixed(1)} mm
          </div>
        )}
        {showSnow && (
          <div className="weather__snow">Snow: {snow['3h'].toFixed(1)} mm</div>
        )}
      </div>
    </li>
  );
};

TimeChunk.propTypes = {
  chunk: PropTypes.object.isRequired
};

export default TimeChunk;

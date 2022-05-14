import formatTemp from './format-temp';
import days from './days-week';

export default function WeatherDay(props) {
  if (props.weather === null || props.weather === undefined) {
    return (
      <div className="current-weather">
        Loading...
      </div>
    );
  }

  const { weather } = props;

  let dateNice = new Date(weather.dt*1000);
  const day = days[dateNice.getDay()];
  const hours = dateNice.getHours();
  const minutes = dateNice.getMinutes();

  return (
    <div className="current-weather">
      <div className="current-weather__summary">
        <span className="current-weather__time">{day}, {hours}:{minutes}</span><br />
        <span className="current-weather__description">{weather.weather[0].description}</span>
      </div>
      <div className="current-weather__icon featured-weather">
        <img 
          className="featured-weather__img"
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        />
        <span className="featured-weather__temp">
          {formatTemp(weather.temp)}
        </span>
      </div>
      <ul className="current-weather__indicators">
        <li>Humidity: {weather.humidity}%</li>
        <li>Wind: {Math.round(weather.wind_speed * 3.6)} km/h</li>
        <li>UV Index: {weather.uvi}</li>
      </ul>
    </div>
  );
};

import formatTemp from './format-temp';
import { daysShort } from './days-week';

export default function DailyPanel(props) {
  const { weather } = props;
  let dateNice = new Date(weather.dt*1000);
  const day = daysShort[dateNice.getDay()];

  return (
    <div className="daily-panel">
      <p className="daily-panel__day">{day}</p>
      <img
        className="daily-panel__img"
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <div className="daily-panel__info daily-info">
        <span className="daily-info__high">{formatTemp(weather.temp.max)}</span>
        <span className="daily-info__low">{formatTemp(weather.temp.min)}</span>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import WeatherDay from './featuredday.jsx';
import DailyPanel from './dailypanel.jsx';

export default function WeatherApp() {
  const [current, setCurrent] = useState(null);
  const [daily, setDaily] = useState([]);

  useEffect(() => {
    
    // consider using the navigator.geolocation API
    async function fetchData() {
      let lat = '33.44';
      let lng = '-94.04';

      await new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          lat = coords.latitude;
          lng = coords.longitude;
          resolve();
        }, () => resolve());
      });

      const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
      const query = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=hourly&units=metric&appid=${apiKey}`
      );
      const { current: now, daily: week } = await query.json();

      setCurrent(now);
      setDaily(week.slice(1, 6));
    }
    fetchData();
  }, []);

  const weeklyOutlook = daily.map((day) => {
    return <DailyPanel key={day.dt} weather={day} />;
  });

  return (
    <div>
      <h1>Weather in Your Area</h1>
      <p className="reduced-paragraph"><i>Asks for your location to get the weather in your area, otherwise defaults to Chicago, Illinois to get the weather outlook. Sadly no chance for precipitation.</i></p>
      <WeatherDay weather={current} />
      <div className="weekly-outlook">
        {weeklyOutlook}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import './App.css';
import { WFURL , WLURL } from './Url';


function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState("");

  const fetchWeather = async () => {
    // if (!city) return;

      const res = await fetch(WFURL+city+WLURL);

      const data = await res.json();
      

    //   Extract only required data
      const requiredWeather = {
        temp: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        city: data.name,
        country: data.sys.country
      };

      setWeather(requiredWeather);
      setError('');
  };

  return (
    <div className="app">
      <h2>🌦 Simple Weather Info</h2>

      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      

      <button onClick={fetchWeather}>Get Weather</button>

{
    weather.temp
}

     {weather && <div className="info">
          <h3>{weather.city}, {weather.country}</h3>
          <p>🌡 Temperature: {weather.temp}°C</p>
          <p>💧 Humidity: {weather.humidity}%</p>
          <p>🌬 Wind Speed: {weather.windSpeed} m/s</p>
        </div>}

    </div>
  );
}

export default App;
import React, { useState } from "react";
import "./App.css";

const API_KEY = "fd157c92888a4d63be3100532250707";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    if (city === "") return;

    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&lang=tr`
    );

    const data = await response.json();
    setWeather(data);
  };

  return (
    <div className="container">
      <h1>Hava Durumu Uygulaması</h1>
      <input
        type="text"
        placeholder="Şehir girin"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Hava Durumunu Getir</button>

      {weather && weather.current && (
        <div className="weather-info">
          <h2>{weather.location.name}</h2>
          <p>{weather.current.condition.text}</p>
          <p>{weather.current.temp_c} °C</p>
          <img
            src={`https:${weather.current.condition.icon}`}
            alt="weather icon"
          />
        </div>
      )}
    </div>
  );
}

export default App;

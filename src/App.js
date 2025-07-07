import React, { useState, useEffect } from "react";

const API_KEY = "fd157c92888a4d63be3100532250707";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [isDay, setIsDay] = useState(true);

  const getWeather = async () => {
    if (city === "") return;

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&lang=tr`
      );
      const data = await response.json();

      if (data.error) {
        setError(data.error.message);
        setWeather(null);
      } else {
        setError("");
        setWeather(data);
        setIsDay(data.current.is_day === 1);
      }
    } catch (error) {
  setError("Veri alınırken bir hata oluştu.");
  setWeather(null);
  console.error(error); // Hata detayını görmek için konsola yazdırabilirsin
}
  };

  return (
    <div className={`container ${isDay ? "day" : "night"}`}>
      <h1>Hava Durumu Uygulaması</h1>
      <input
        type="text"
        placeholder="Şehir girin"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Hava Durumunu Getir</button>

      {error && <p className="error">{error}</p>}

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

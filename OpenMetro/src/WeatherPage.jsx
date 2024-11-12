// components/WeatherPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function WeatherPage() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get('city');

  const weatherDescriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Slight thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail"
  };

  useEffect(() => {
    if (city) {
      // Fetch latitude and longitude based on city name (using Open-Meteo or a separate geocoding service)
      fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
        .then((response) => response.json())
        .then((geoData) => {
          if (geoData.results && geoData.results.length > 0) {
            const { latitude, longitude } = geoData.results[0];
            return fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode,uv_index,visibility`
            );
          } else {
            throw new Error('City not found');
          }
        })
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [city]);

  if (loading) return  <div className="container-box"> <div className="banner">Loading...</div></div>;
  if (error) return <div className="container-box"> <div className="banner">{error}</div></div>;

  // Get weather condition description based on weathercode
  const weatherCondition = weatherDescriptions[weatherData?.hourly?.weathercode?.[0]] || "Unknown condition";

  return (
    <div className="container">
      <h1 className="">Weather in {city}</h1>
      <div className="">
        <p><strong>Weather Condition:</strong> {weatherCondition}</p>
        <p><strong>Temperature:</strong> {weatherData.hourly.temperature_2m[0]}°C</p>
        <p><strong>UV Index:</strong> {weatherData.hourly.uv_index[0]}</p>
        <p><strong>Visibility:</strong> {weatherData.hourly.visibility[0]} m</p>
      </div>

      {weatherData.alerts && (
        <div className="">
          <h2 className="">Weather Alerts</h2>
          <p>{weatherData.alerts}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherPage;

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

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Weather in {city}</h1>
      <div className="mb-4">
        <p><strong>Temperature:</strong> {weatherData.hourly.temperature_2m[0]}°C</p>
        <p><strong>Weather Condition:</strong> {weatherData.hourly.weathercode[0]}</p>
        <p><strong>UV Index:</strong> {weatherData.hourly.uv_index[0]}</p>
        <p><strong>Visibility:</strong> {weatherData.hourly.visibility[0]} m</p>
      </div>

      {weatherData.alerts && (
        <div className="bg-yellow-100 p-2 rounded-md">
          <h2 className="font-bold">Weather Alerts</h2>
          <p>{weatherData.alerts}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherPage;

// components/SearchPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchPage() {
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      navigate(`/weather?city=${encodeURIComponent(city)}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <h1 className="text-3xl font-bold mb-4">Weather Now</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 border rounded-md"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
          Get Weather
        </button>
      </form>
    </div>
  );
}

export default SearchPage;

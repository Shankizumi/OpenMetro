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
    <div className="container">
      <h1 className="">Weather Now</h1>
      <form onSubmit={handleSubmit} className="">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className=""
        />
        <button type="submit" className="">
          Get Weather
        </button>
      </form>
    </div>
  );
}

export default SearchPage;

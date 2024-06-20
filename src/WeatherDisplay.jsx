import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState("Hyderabad");
  const apiKey = "your_api_key";

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}`
        );
        setWeatherData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchWeatherData();
  }, [selectedCity]);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  if (loading) return <p>Loading weather...</p>;
  if (error) return <p>Error fetching weather: {error.message}</p>;

  return (
    <div>
      <h2>Weather in {weatherData.name}</h2>
      <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
      <p>Condition: {weatherData.weather[0].description}</p>

      <select value={selectedCity} onChange={handleCityChange}>
        <option value="Hyderabad">Hyderabad</option>
        <option value="New York">New York</option>
        <option value="London">London</option>
        <option value="Tokyo">Tokyo</option>
        <option value="Paris">Paris</option>
        <option value="Berlin">Berlin</option>
        <option value="Sydney">Sydney</option>
        <option value="Dubai">Dubai</option>
        <option value="Singapore">Singapore</option>
      </select>
    </div>
  );
};

export default WeatherDisplay;

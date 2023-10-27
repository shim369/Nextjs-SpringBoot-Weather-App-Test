"use client"
import React, { useState, useEffect, ChangeEvent } from 'react';

export default function Home() {
  const [data, setData] = useState<string>('');
  const [city, setCity] = useState<string>('London');
  const [country, setCountry] = useState<string>('uk');
  const [countries] = useState<string[]>(['uk', 'us', 'fr', 'jp', 'au']);

  const citiesByCountry: { [key: string]: string[] } = {
    uk: ['London', 'Manchester', 'Liverpool'],
    us: ['New York', 'Los Angeles', 'Chicago'],
    fr: ['Paris', 'Marseille', 'Lyon'],
    jp: ['Tokyo', 'Osaka', 'Kyoto'],
    au: ['Sydney', 'Melbourne', 'Brisbane'],
  };

  useEffect(() => {
    fetchWeatherData(city, country);
  }, [city, country]);

  const fetchWeatherData = async (city: string, country: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/weather?city=${city}&country=${country}`);
      if (response.status === 200) {
        const responseData = await response.json();
        const weatherData = JSON.parse(responseData.response);

        const mainWeather = weatherData.weather[0].main;
        const description = weatherData.weather[0].description;
        const minTempKelvin = weatherData.main.temp_min;
        const maxTempKelvin = weatherData.main.temp_max;
        const sunriseUnixTimestamp = weatherData.sys.sunrise;
        const sunsetUnixTimestamp = weatherData.sys.sunset;

        const minTempCelsius = (minTempKelvin - 273.15).toFixed(2);
        const maxTempCelsius = (maxTempKelvin - 273.15).toFixed(2);

        const sunriseTime = new Date(sunriseUnixTimestamp * 1000).toLocaleTimeString();
        const sunsetTime = new Date(sunsetUnixTimestamp * 1000).toLocaleTimeString();

        const displayText = `Weather: ${mainWeather} - ${description}
        Min Temperature: ${minTempCelsius} °C
        Max Temperature: ${maxTempCelsius} °C
        Sunrise: ${sunriseTime}
        Sunset: ${sunsetTime}`;

        setData(displayText);
      } else {
        console.error('API エラー:', response.statusText);
      }
    } catch (error) {
      console.error('API エラー:', error);
    }
  };

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = event.target.value;
    setCountry(selectedCountry);
  };

  const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = event.target.value;
    setCity(selectedCity);
  };

  const citiesForSelectedCountry = citiesByCountry[country] || [];

  return (
    <div>
      <h1>Weather Information</h1>
      <div>
        <label>Select Country</label>
        <select value={country} onChange={handleCountryChange}>
          {countries.map((c, index) => (
            <option key={index} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Select City</label>
        <select value={city} onChange={handleCityChange}>
          {citiesForSelectedCountry.map((c, index) => (
            <option key={index} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <p>{data}</p>
    </div>
  );
}

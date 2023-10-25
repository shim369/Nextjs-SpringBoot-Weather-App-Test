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
        const weatherData = await response.json();
        setData(JSON.stringify(weatherData, null, 2));
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
      <h1>取得した天気情報</h1>
      <div>
        <label>国を選択</label>
        <select value={country} onChange={handleCountryChange}>
          {countries.map((c, index) => (
            <option key={index} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>都市を選択</label>
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

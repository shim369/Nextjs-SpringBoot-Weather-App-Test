package com.example.backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {
    
    @Value("${openweather.api.key}")
    private String apiToken;
    
    String openWeatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";

    RestTemplate restTemplate;

    public WeatherService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public WeatherData getWeatherData(String city) {
        String url = openWeatherApiUrl + "?q=" + city + "&units=metric&appid=" + apiToken;
        WeatherData response = restTemplate.getForObject(url, WeatherData.class);
        return response;
    }
}

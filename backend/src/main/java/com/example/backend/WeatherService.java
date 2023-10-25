package com.example.backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    @Value("${openweather.api.key}")
    private String apiToken;

    @Value("${openweather.api.url}")
    private String openWeatherApiUrl;

    RestTemplate restTemplate;

    public WeatherService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public WeatherData getWeatherData(String city, String country) {
        try {
            String url = openWeatherApiUrl + "?q=" + city + "," + country + "&appid=" + apiToken;
            String response = restTemplate.getForObject(url, String.class);
            WeatherData weatherData = new WeatherData();
            weatherData.setResponse(response);
            return weatherData;
        } catch (RestClientException ex) {
            WeatherData errorData = new WeatherData();
            errorData.setResponse("Error: " + ex.getMessage());
            return errorData;
        }
    }    
}

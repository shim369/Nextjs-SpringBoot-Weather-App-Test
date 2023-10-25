package com.example.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class DemoApplicationTests {

    @Autowired
    private WeatherService weatherService;

    @Test
    void testGetWeatherData() {
        // テスト用の都市名と国名を指定
        String city = "London";
        String country = "uk";
    
        WeatherData weatherData = weatherService.getWeatherData(city, country);

        assertNotNull(weatherData);
    }    
}





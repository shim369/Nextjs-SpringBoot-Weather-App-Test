package com.example.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class DemoApplicationTests {

    @Autowired
    private WeatherService weatherService;

    @Test
    void testGetWeatherData() {
        WeatherData weatherData = weatherService.getWeatherData("London,uk");

        assertEquals("Clouds", weatherData.getDescription());
        assertEquals(281.36, weatherData.getTemperature(), 0.01);
    }
}

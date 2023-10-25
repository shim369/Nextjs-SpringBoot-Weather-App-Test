package com.example.backend;

public class WeatherData {
    private String response;

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    @Override
    public String toString() {
        return "WeatherData{" +
                "response='" + response + '\'' +
                '}';
    }
}

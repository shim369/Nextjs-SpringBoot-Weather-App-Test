package com.example.backend.controller;
import java.util.Map;
import java.util.HashMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DataController {

    @GetMapping("/example")
    public Map<String, String> getExampleData() {
        Map<String, String> data = new HashMap<>();
        data.put("message", "This is example data from DataController.");
        return data;
    }
}
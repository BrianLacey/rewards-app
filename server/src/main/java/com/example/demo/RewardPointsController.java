package com.example.demo;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import models.helloWorldResponse;

@RestController
public class RewardPointsController {

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/")
    public helloWorldResponse home() {
        return new helloWorldResponse("Hello World!");
    }

}

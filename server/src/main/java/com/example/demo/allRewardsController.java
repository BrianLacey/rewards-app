package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import models.allRewardsResponse;
import models.transactionModel;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rewards")
@CrossOrigin(origins = "http://localhost:5173")
public class allRewardsController {

    @Autowired
    private com.example.demo.allRewardsService allRewardsService;

    @PostMapping("/calculate-all")
    public Map<String, allRewardsResponse> calculateRewards(@RequestBody List<transactionModel> data) {
        return allRewardsService.calculateRewards(data);
    }
}
package com.example.demo;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import models.quarterRewardsResponse;
import models.transactionModel;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rewards")
@CrossOrigin(origins = "http://localhost:5173")
public class quarterRewardsController {

    @Autowired
    private quarterRewardsService rewardService;

    @PostMapping("/calculate-quarterly")
    public Map<String, quarterRewardsResponse> getThreeMonthRewards(
            @RequestBody List<transactionModel> data,
            @RequestParam int startMonth,
            @RequestParam int startYear) {

        return rewardService.calculateRewards(data, startMonth, startYear);
    }
}
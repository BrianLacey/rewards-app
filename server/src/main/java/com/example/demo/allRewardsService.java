package com.example.demo;

import org.springframework.stereotype.Service;

import models.allRewardsResponse;
import models.transactionModel;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class allRewardsService {

    private static int calculatePoints(double amount) {
        int points = 0;
        if (amount > 100) {
            points += 50;
            points += (int) ((amount - 100) * 2);
        } else if (amount > 50) {
            points += (int) (amount - 50);
        }
        return points;
    }

    private static String getMonthKey(String date) {
        LocalDate d = LocalDate.parse(date);
        return String.format("%04d-%02d", d.getYear(), d.getMonthValue());
    }

    public Map<String, allRewardsResponse> calculateRewards(List<transactionModel> transactions) {
        Map<String, allRewardsResponse> rewards = new HashMap<>();

        for (transactionModel t : transactions) {
            String name = t.getName();
            double amount = Double.parseDouble(t.getTotal().replace("$", ""));
            int points = calculatePoints(amount);
            String monthKey = getMonthKey(t.getDate());

            rewards.putIfAbsent(name, new allRewardsResponse());
            rewards.get(name).addPoints(points, monthKey);
        }

        return rewards;
    }
}
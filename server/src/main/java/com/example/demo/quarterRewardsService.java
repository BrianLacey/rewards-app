package com.example.demo;

import org.springframework.stereotype.Service;

import models.quarterRewardsResponse;
import models.transactionModel;

import java.time.LocalDate;
import java.util.*;

@Service
public class quarterRewardsService {

    public Map<String, quarterRewardsResponse> calculateRewards(List<transactionModel> data, int startMonth, int startYear) {

        Map<String, quarterRewardsResponse> rewards = new HashMap<>();

        LocalDate start = LocalDate.of(startYear, startMonth, 1);
        LocalDate end = start.plusMonths(3);

        // Generate 3 month keys
        List<String> monthKeys = new ArrayList<>();
        LocalDate temp = start;

        for (int i = 0; i < 3; i++) {
            monthKeys.add(formatMonth(temp));
            temp = temp.plusMonths(1);
        }

        for (transactionModel entry : data) {
            LocalDate transactionDate = LocalDate.parse(entry.getDate());

            if (!transactionDate.isBefore(start) && transactionDate.isBefore(end)) {

                String name = entry.getName();
                double amount = Double.parseDouble(entry.getTotal().replace("$", ""));

                int points = calculatePoints(amount);
                String monthKey = formatMonth(transactionDate);

                rewards.putIfAbsent(name, new quarterRewardsResponse(0, new HashMap<>()));

                quarterRewardsResponse user = rewards.get(name);

                // Initialize months if empty
                if (user.getMonthly().isEmpty()) {
                    for (String key : monthKeys) {
                        user.getMonthly().put(key, 0);
                    }
                }

                user.getMonthly().put(monthKey, user.getMonthly().get(monthKey) + points);

                // update total
                int updatedTotal = user.getTotal() + points;
                rewards.put(name, new quarterRewardsResponse(updatedTotal, user.getMonthly()));
            }
        }

        return rewards;
    }

    private int calculatePoints(double amount) {
        int points = 0;

        if (amount > 100) {
            points += 50;
            points += (int) ((amount - 100) * 2);
        } else if (amount > 50) {
            points += (int) (amount - 50);
        }

        return points;
    }

    private String formatMonth(LocalDate date) {
        return String.format("%d-%02d", date.getYear(), date.getMonthValue());
    }
}
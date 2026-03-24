package models;

import java.util.HashMap;
import java.util.Map;

public class allRewardsResponse {
    private int total;
    private Map<String, Integer> monthly;

    public allRewardsResponse() {
        this.total = 0;
        this.monthly = new HashMap<>();
    }

    public int getTotal() { return total; }
    public void setTotal(int total) { this.total = total; }

    public Map<String, Integer> getMonthly() { return monthly; }
    public void setMonthly(Map<String, Integer> monthly) { this.monthly = monthly; }

    public void addPoints(int points, String monthKey) {
        this.total += points;
        this.monthly.put(monthKey, this.monthly.getOrDefault(monthKey, 0) + points);
    }
}
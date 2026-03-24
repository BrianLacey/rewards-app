package models;

import java.util.Map;

public class quarterRewardsResponse {
    private int total;
    private Map<String, Integer> monthly;

    public quarterRewardsResponse(int total, Map<String, Integer> monthly) {
        this.total = total;
        this.monthly = monthly;
    }

    public int getTotal() {
        return total;
    }

    public Map<String, Integer> getMonthly() {
        return monthly;
    }
}
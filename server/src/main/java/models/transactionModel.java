package models;

public class transactionModel {
    private String name;
    private String date;
    private String total;

    public transactionModel() {}

    public transactionModel(String name, String date, String total) {
        this.name = name;
        this.date = date;
        this.total = total;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getTotal() { return total; }
    public void setTotal(String total) { this.total = total; }
}
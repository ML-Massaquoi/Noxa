package com.noxa.backend.dto.request;

import java.util.List;

public class OrderCreateRequest {
    private List<OrderItemRequest> items;
    private String street;
    private String aptSuite;
    private String city;
    private String zip;
    private String specialInstructions;

    public static class OrderItemRequest {
        private Long menuItemId;
        private Integer quantity;

        public Long getMenuItemId() { return menuItemId; }
        public void setMenuItemId(Long menuItemId) { this.menuItemId = menuItemId; }
        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }

    public List<OrderItemRequest> getItems() { return items; }
    public void setItems(List<OrderItemRequest> items) { this.items = items; }
    public String getStreet() { return street; }
    public void setStreet(String street) { this.street = street; }
    public String getAptSuite() { return aptSuite; }
    public void setAptSuite(String aptSuite) { this.aptSuite = aptSuite; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getZip() { return zip; }
    public void setZip(String zip) { this.zip = zip; }
    public String getSpecialInstructions() { return specialInstructions; }
    public void setSpecialInstructions(String specialInstructions) { this.specialInstructions = specialInstructions; }
}
package com.noxa.backend.dto.request;

import java.util.List;

public class OrderCreateRequest {
    // Matches TypeScript: customerInfo
    private CustomerInfoRequest customerInfo;
    // Matches TypeScript: deliveryInfo
    private DeliveryInfoRequest deliveryInfo;
    // Matches TypeScript: items
    private List<OrderItemRequest> items;
    // Matches TypeScript: paymentMethod (from previous Angular update)
    private String paymentMethod;

    // Getters and Setters
    public CustomerInfoRequest getCustomerInfo() { return customerInfo; }
    public void setCustomerInfo(CustomerInfoRequest customerInfo) { this.customerInfo = customerInfo; }
    public DeliveryInfoRequest getDeliveryInfo() { return deliveryInfo; }
    public void setDeliveryInfo(DeliveryInfoRequest deliveryInfo) { this.deliveryInfo = deliveryInfo; }
    public List<OrderItemRequest> getItems() { return items; }
    public void setItems(List<OrderItemRequest> items) { this.items = items; }
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
}

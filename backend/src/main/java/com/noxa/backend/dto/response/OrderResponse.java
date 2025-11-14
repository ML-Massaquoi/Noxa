package com.noxa.backend.dto.response;

import com.noxa.backend.entity.Order;
import com.noxa.backend.entity.OrderStatus;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class OrderResponse {
    private Long id;
    private String orderNumber;
    private Double total;
    private OrderStatus status;
    private LocalDateTime createdAt;
    private List<OrderItemResponse> items;

    public static class OrderItemResponse {
        private String name;
        private Integer quantity;
        private Double unitPrice;

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
        public Double getUnitPrice() { return unitPrice; }
        public void setUnitPrice(Double unitPrice) { this.unitPrice = unitPrice; }
    }

    public static OrderResponse from(Order order) {
        OrderResponse res = new OrderResponse();
        res.id = order.getId();
        res.orderNumber = order.getOrderNumber();
        res.total = order.getTotal();
        res.status = order.getStatus();
        res.createdAt = order.getCreatedAt();
        res.items = order.getItems().stream().map(item -> {
            OrderItemResponse i = new OrderItemResponse();
            i.setName(item.getMenuItem().getName());
            i.setQuantity(item.getQuantity());
            i.setUnitPrice(item.getUnitPrice());
            return i;
        }).collect(Collectors.toList());
        return res;
    }

    // Getters
    public Long getId() { return id; }
    public String getOrderNumber() { return orderNumber; }
    public Double getTotal() { return total; }
    public OrderStatus getStatus() { return status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public List<OrderItemResponse> getItems() { return items; }
}
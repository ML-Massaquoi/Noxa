package com.noxa.backend.dto.response;

import com.noxa.backend.entity.MenuItem;
import lombok.Data;

@Data
public class OrderItemResponse {
    private Long id;
    private String name;
    private double price;
    private int quantity;

    public static OrderItemResponse from(com.noxa.backend.entity.OrderItem orderItem) {
        OrderItemResponse response = new OrderItemResponse();
        response.setId(orderItem.getId());
        MenuItem menuItem = orderItem.getMenuItem();
        if (menuItem != null) {
            response.setName(menuItem.getName());
            response.setPrice(menuItem.getPrice());
        }
        response.setQuantity(orderItem.getQuantity());
        return response;
    }
}

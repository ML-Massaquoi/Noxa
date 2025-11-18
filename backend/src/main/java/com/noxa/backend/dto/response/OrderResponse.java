package com.noxa.backend.dto.response;

import com.noxa.backend.entity.Order;
import com.noxa.backend.entity.OrderStatus;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class OrderResponse {
    private Long id;
    private String customerName;
    private String address;
    private String phone;
    private double totalPrice;
    private OrderStatus status;
    private List<OrderItemResponse> items;

    public static OrderResponse from(Order order) {
        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setCustomerName(order.getCustomerName());
        response.setAddress(order.getAddress());
        response.setPhone(order.getPhone());
        response.setTotalPrice(order.getTotalPrice());
        response.setStatus(order.getStatus());
        response.setItems(order.getItems().stream().map(OrderItemResponse::from).collect(Collectors.toList()));
        return response;
    }
}

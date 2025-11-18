package com.noxa.backend.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    private String customerName;
    private String address;
    private String phone;
    private List<OrderItemRequest> items;
}

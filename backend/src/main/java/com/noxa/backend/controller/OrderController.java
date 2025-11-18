package com.noxa.backend.controller;

import com.noxa.backend.dto.request.OrderRequest;
import com.noxa.backend.dto.response.OrderResponse;
import com.noxa.backend.entity.Order;
import com.noxa.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderRequest orderRequest) {
        Order order = orderService.createOrder(orderRequest);
        return ResponseEntity.ok(OrderResponse.from(order));
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        List<OrderResponse> orderResponses = orders.stream()
                .map(OrderResponse::from)
                .collect(Collectors.toList());
        return ResponseEntity.ok(orderResponses);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<OrderResponse> updateOrderStatus(@PathVariable Long id, @RequestBody com.noxa.backend.dto.request.StatusUpdateRequest statusUpdateRequest) {
        Order order = orderService.updateOrderStatus(id, statusUpdateRequest.getStatus());
        return ResponseEntity.ok(OrderResponse.from(order));
    }
}

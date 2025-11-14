package com.noxa.backend.controller;

import com.noxa.backend.dto.request.OrderCreateRequest;
import com.noxa.backend.dto.response.OrderResponse;
import com.noxa.backend.entity.User;
import com.noxa.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> create(@RequestBody OrderCreateRequest req,
                                                @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(OrderResponse.from(orderService.createOrder(req, user)));
    }

    @GetMapping("/user")
    public List<OrderResponse> userOrders(@AuthenticationPrincipal User user) {
        return orderService.getUserOrders(user.getId()).stream()
                .map(OrderResponse::from)
                .collect(Collectors.toList());
    }
}
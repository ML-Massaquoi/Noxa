package com.noxa.backend.controller;

import com.noxa.backend.dto.response.OrderResponse;
import com.noxa.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/submissions")
    public List<OrderResponse> getPending() {
        return orderService.getPending().stream()
                .map(OrderResponse::from)
                .collect(Collectors.toList());
    }

    @PatchMapping("/orders/{id}/approve")
    public ResponseEntity<Void> approve(@PathVariable Long id) {
        orderService.approve(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/orders/{id}/reject")
    public ResponseEntity<Void> reject(@PathVariable Long id) {
        orderService.reject(id);
        return ResponseEntity.ok().build();
    }
}
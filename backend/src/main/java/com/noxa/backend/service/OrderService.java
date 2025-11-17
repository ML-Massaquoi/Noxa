package com.noxa.backend.service;

import com.noxa.backend.dto.request.OrderCreateRequest;
//import com.noxa.backend.service.*;
import com.noxa.backend.entity.*;
import com.noxa.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class OrderService {

    @Autowired private OrderRepository orderRepository;
    @Autowired private MenuService menuService;
    @Autowired private EmailService emailService;

    @Transactional
    public Order createOrder(OrderCreateRequest req, User user) {
        Order order = new Order();
        order.setOrderNumber("NOXA-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        order.setUser(user);
        order.setStreet(req.getStreet());
        order.setAptSuite(req.getAptSuite());
        order.setCity(req.getCity());
        order.setZip(req.getZip());
        order.setSpecialInstructions(req.getSpecialInstructions());

        double total = 0;
        for (var itemReq : req.getItems()) {
            MenuItem menuItem = menuService.getById(itemReq.getMenuItemId());
            if (menuItem == null) {
                throw new RuntimeException("Menu item not found with id: " + itemReq.getMenuItemId());
            }
            OrderItem orderItem = new OrderItem();
            orderItem.setMenuItem(menuItem);
            orderItem.setQuantity(itemReq.getQuantity());
            orderItem.setUnitPrice(menuItem.getPrice());
            orderItem.setOrder(order);
            order.getItems().add(orderItem);
            total += menuItem.getPrice() * itemReq.getQuantity();
        }
        order.setTotal(total);

        Order saved = orderRepository.save(order);
        emailService.sendConfirmation(saved);
        return saved;
    }

    public List<Order> getUserOrders(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public List<Order> getPending() {
        return orderRepository.findPendingForAdmin();
    }

    @Transactional
    public void approve(Long id) {
        Order order = orderRepository.findById(id).orElseThrow();
        order.setStatus(OrderStatus.APPROVED);
        orderRepository.save(order);
    }

    @Transactional
    public void reject(Long id) {
        Order order = orderRepository.findById(id).orElseThrow();
        order.setStatus(OrderStatus.REJECTED);
        orderRepository.save(order);
    }
}
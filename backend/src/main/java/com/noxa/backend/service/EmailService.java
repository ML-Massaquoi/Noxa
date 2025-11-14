package com.noxa.backend.service;

import com.noxa.backend.entity.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired private JavaMailSender mailSender;

    public void sendConfirmation(Order order) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(order.getUser().getEmail());
        message.setSubject("Order Confirmed - " + order.getOrderNumber());
        message.setText("Your order has been received and is being processed.\nTotal: $" + order.getTotal());
        mailSender.send(message);
    }
}
package com.noxa.backend.repository;

import com.noxa.backend.entity.Order;
import com.noxa.backend.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
    List<Order> findByStatus(OrderStatus status);

    @Query("SELECT o FROM Order o WHERE o.status = 'PENDING' ORDER BY o.createdAt DESC")
    List<Order> findPendingForAdmin();
}
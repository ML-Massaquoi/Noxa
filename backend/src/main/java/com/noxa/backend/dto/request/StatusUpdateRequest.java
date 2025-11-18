package com.noxa.backend.dto.request;

import com.noxa.backend.entity.OrderStatus;
import lombok.Data;

@Data
public class StatusUpdateRequest {
    private OrderStatus status;
}
package com.karakoc.ecommerce.orders.requests;

import lombok.Data;

@Data
public class CreateOrderRequest {
    private String productId;
    private String userId;
}

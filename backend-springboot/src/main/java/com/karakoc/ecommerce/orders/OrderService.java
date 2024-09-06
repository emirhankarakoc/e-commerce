package com.karakoc.ecommerce.orders;

import com.karakoc.ecommerce.orders.requests.CreateOrderRequest;

public interface OrderService {
    Order createOrder(CreateOrderRequest r);
}

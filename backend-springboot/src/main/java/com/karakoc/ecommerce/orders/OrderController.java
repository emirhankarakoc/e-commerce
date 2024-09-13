package com.karakoc.ecommerce.orders;


import com.karakoc.ecommerce.orders.requests.CreateOrderRequest;
import com.karakoc.ecommerce.security.UserPrincipal;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
@AllArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    public Order postOrder(@AuthenticationPrincipal UserPrincipal principal, @RequestBody CreateOrderRequest r){
        return orderService.createOrder(principal.getUserId(),r);
    }
}

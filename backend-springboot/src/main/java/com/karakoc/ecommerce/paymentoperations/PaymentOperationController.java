package com.karakoc.ecommerce.paymentoperations;


import com.karakoc.ecommerce.exceptions.general.ForbiddenException;
import com.karakoc.ecommerce.paymentoperations.requests.CreatePaymentOperationRequest;
import com.karakoc.ecommerce.paymentoperations.requests.PaymentOperationResponse;
import com.karakoc.ecommerce.security.UserPrincipal;
import lombok.AllArgsConstructor;
import org.hibernate.query.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@AllArgsConstructor
// i have put this class name = Order
//but sql syntax include "order" keyword.
//so i had to change to PaymentOperation
public class PaymentOperationController {
    private final PaymentOperationService paymentOperationService;

    @PostMapping
    public ResponseEntity postOrder(@AuthenticationPrincipal UserPrincipal principal, @RequestBody CreatePaymentOperationRequest r){
        paymentOperationService.checkout(principal.getUserId(),r);
        return ResponseEntity.ok("Checkout succesful.");
    }

    @GetMapping("/all")
    public List<PaymentOperationResponse> getAllMyOrders(@AuthenticationPrincipal UserPrincipal principal){
        return paymentOperationService.getAllMyOrders(principal.getUserId());
    }
    @GetMapping("/{id}")
    public PaymentOperationResponse getOrder(@AuthenticationPrincipal UserPrincipal principal,@PathVariable String id){

        return paymentOperationService.getOrder(principal.getUserId(),id);
    }

}

package com.karakoc.ecommerce.paymentoperations;

import com.karakoc.ecommerce.paymentoperations.requests.CreatePaymentOperationRequest;
import com.karakoc.ecommerce.paymentoperations.requests.PaymentOperationResponse;
import com.karakoc.ecommerce.security.UserPrincipal;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface PaymentOperationService {
    void checkout(String userId, CreatePaymentOperationRequest r);
    List<PaymentOperationResponse> getAllMyOrders(String userId);
    PaymentOperationResponse getOrder(String userId, String orderId);


}

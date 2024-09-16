package com.karakoc.ecommerce.paymentoperations;

import com.karakoc.ecommerce.paymentoperations.requests.CreatePaymentOperationRequest;
import com.karakoc.ecommerce.paymentoperations.requests.PaymentOperationResponse;

import java.util.List;

public interface PaymentOperationService {
    void checkout(String userId, CreatePaymentOperationRequest r);
    List<PaymentOperationResponse> getAllMyOrders(String userId);
    PaymentOperationResponse getOrder(String userId, String orderId);
    List<PaymentOperationResponse> getAllOrders();


    void setPaymentStatusToSent(String orderId);
    void setPaymentStatusToFinished(String orderId);
    void setPaymentStatusToPreparing(String orderId);


}

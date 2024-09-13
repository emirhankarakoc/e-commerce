package com.karakoc.ecommerce.paymentoperations.requests;

import lombok.Data;

@Data
public class CreatePaymentOperationRequest {
    private String shippingTypeId;
    private String addressId;
    private String cardOwnerName; //for logs, no matter.
    private String cardNumber;
    private String expiration;
    private String cvv;
}

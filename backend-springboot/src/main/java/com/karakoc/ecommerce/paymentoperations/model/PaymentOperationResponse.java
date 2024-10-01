package com.karakoc.ecommerce.paymentoperations.model;

import com.karakoc.ecommerce.cartitems.model.CartItem;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class PaymentOperationResponse {
    private String id;
    private String userId;
    private List<CartItem> smartphones;
    private String shippingType;
    private String adress;
    private String cardOwnerName;
    private String subtotal;
    private LocalDateTime date;
    private Status status;
    private String cardNumber;
}

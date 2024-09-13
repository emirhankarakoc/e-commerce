package com.karakoc.ecommerce.paymentoperations.requests;

import com.karakoc.ecommerce.carts.item.CartItem;
import com.karakoc.ecommerce.paymentoperations.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Enumerated;
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

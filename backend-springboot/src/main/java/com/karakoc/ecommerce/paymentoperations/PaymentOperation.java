package com.karakoc.ecommerce.paymentoperations;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.karakoc.ecommerce.carts.Cart;
import com.karakoc.ecommerce.carts.item.CartItem;
import com.karakoc.ecommerce.paymentoperations.requests.PaymentOperationResponse;
import com.karakoc.ecommerce.smartphones.Smartphone;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class PaymentOperation {
    // i have put this class name = Order
    //but sql syntax include "order" keyword.
    //so i had to change to PaymentOperation
    @Id
    private String id;
    @Column(columnDefinition = "TEXT")
    private String userId;

    private String cartId;
    @Column(columnDefinition = "TEXT")
    private String shippingTypeId;
    @Column(columnDefinition = "TEXT")
    private String addressId;
    @Column(columnDefinition = "TEXT")
    private String cardOwnerName;
    private String subtotal;
    private LocalDateTime date;

    @Enumerated
    private Status status;

//after this row, 3 fields will be secret.
    @Column(columnDefinition = "TEXT")
    private String cardNumber;
    private String expiration;
    private String cvv;











}

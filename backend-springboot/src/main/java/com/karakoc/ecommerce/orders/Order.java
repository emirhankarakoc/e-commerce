package com.karakoc.ecommerce.orders;

import com.karakoc.ecommerce.products.ProductType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Order {
    @Id
    private String id;
    @Column(columnDefinition = "TEXT")
    private String userId;

    @Column(columnDefinition = "TEXT")
    private String shippingTypeId;
    @Column(columnDefinition = "TEXT")
    private String addressId;
    @Column(columnDefinition = "TEXT")
    private String cardOwnerName;

    private String subtotal;
    private LocalDateTime date;



}

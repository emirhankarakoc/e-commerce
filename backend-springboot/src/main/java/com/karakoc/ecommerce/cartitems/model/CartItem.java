package com.karakoc.ecommerce.cartitems.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class CartItem {
    @Id
    private String id;
    private String cartId;
    private String productId;
    private String productName;
    private String productImage;
    private String productPrice;
    private String extras;


}

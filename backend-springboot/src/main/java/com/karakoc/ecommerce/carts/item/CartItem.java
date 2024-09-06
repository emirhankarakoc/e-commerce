package com.karakoc.ecommerce.carts.item;


import com.karakoc.ecommerce.products.Product;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
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

package com.karakoc.ecommerce.carts.model;

import com.karakoc.ecommerce.cartitems.model.CartItem;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Cart {
    @Id
    private String id;

    @OneToMany
    @JoinColumn(name = "cartItemId")
    private List<CartItem> items;

    private double summary;
}

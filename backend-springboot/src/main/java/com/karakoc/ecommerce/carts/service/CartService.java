package com.karakoc.ecommerce.carts.service;

import com.karakoc.ecommerce.carts.model.AddToCartRequest;
import com.karakoc.ecommerce.carts.model.Cart;

public interface CartService {
    Cart addToCart(String userId, AddToCartRequest r);
    Cart removeFromCart(String userId, String cartItemId);
}

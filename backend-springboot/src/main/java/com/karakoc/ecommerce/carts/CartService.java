package com.karakoc.ecommerce.carts;

import com.karakoc.ecommerce.carts.requests.AddToCartRequest;

public interface CartService {
    Cart addToCart(String userId,AddToCartRequest r);
    Cart removeFromCart(String userId, String cartItemId);
}

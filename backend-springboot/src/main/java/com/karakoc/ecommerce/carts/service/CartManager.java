package com.karakoc.ecommerce.carts.service;


import com.karakoc.ecommerce.cartitems.model.CartItem;
import com.karakoc.ecommerce.cartitems.repository.CartItemRepository;
import com.karakoc.ecommerce.carts.repository.CartRepository;
import com.karakoc.ecommerce.carts.model.AddToCartRequest;
import com.karakoc.ecommerce.carts.model.Cart;
import com.karakoc.ecommerce.exceptions.general.NotfoundException;
import com.karakoc.ecommerce.products.model.Product;
import com.karakoc.ecommerce.products.repository.ProductRepository;
import com.karakoc.ecommerce.users.model.User;
import com.karakoc.ecommerce.users.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class CartManager implements CartService{
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;

    @Override
    @Transactional
    public Cart addToCart(String userId, AddToCartRequest r) {
        User buyer = userRepository.findById(userId).get();
        Product product = productRepository.findById(r.getProductId()).orElseThrow(()-> new NotfoundException("Product not found"));
        Cart cart = cartRepository.findById(buyer.getCartId()).orElseThrow(()->new NotfoundException("Cart not found."));

        CartItem item = new CartItem();
        item.setCartId(cart.getId());
        item.setId(UUID.randomUUID().toString());
        item.setProductId(product.getId());
        if (product.getImages().isEmpty()){
            item.setProductImage(null);
        }
        else{
            item.setProductImage(product.getImages().get(0).getImageUrl());
        }
        item.setProductPrice(product.getPrice());
        item.setProductName(product.getBrandName() +" "+ product.getModelName());
        item.setExtras("Color: " + r.getProductColor() + " Memory: " + r.getProductMemory());
        cartItemRepository.save(item);
        cart.getItems().add(item);
        double summary = cart.getSummary();
        String priceWithoutDollarSymbol = product.getPrice().substring(1);
        cart.setSummary(summary+ Double.parseDouble(priceWithoutDollarSymbol));
        cartRepository.save(cart); // az once bu yoktu, nasil calisiyordu?
        userRepository.save(buyer);
        return cart;
    }

    @Override
    @Transactional
    public Cart removeFromCart(String userId, String cartItemId) {
        User buyer = userRepository.findById(userId).get();
        CartItem item = cartItemRepository.findById(cartItemId).orElseThrow(()-> new NotfoundException("Product not found"));
        Cart cart = cartRepository.findById(buyer.getCartId()).orElseThrow(()->new NotfoundException("Cart not found."));


        cart.getItems().remove(item);
        double summary = cart.getSummary();
        String newPriceWithoutDollarSymbol = item.getProductPrice().substring(1);
        cart.setSummary(summary- Double.parseDouble(newPriceWithoutDollarSymbol));
        cartRepository.save(cart);
        userRepository.save(buyer);
        cartItemRepository.delete(item);
        return cart;
    }
}

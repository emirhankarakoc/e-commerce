package com.karakoc.ecommerce.carts;


import com.karakoc.ecommerce.carts.item.CartItem;
import com.karakoc.ecommerce.carts.item.CartItemRepository;
import com.karakoc.ecommerce.carts.requests.AddToCartRequest;
import com.karakoc.ecommerce.exceptions.general.BadRequestException;
import com.karakoc.ecommerce.exceptions.general.NotfoundException;
import com.karakoc.ecommerce.products.Product;
import com.karakoc.ecommerce.products.ProductRepository;
import com.karakoc.ecommerce.user.User;
import com.karakoc.ecommerce.user.UserRepository;
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
        Cart cart = buyer.getCart();

        CartItem item = new CartItem();
        item.setCartId(buyer.getCart().getId());
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
        userRepository.save(buyer);
        return buyer.getCart();
    }

    @Override
    @Transactional
    public Cart removeFromCart(String userId, String cartItemId) {
        User buyer = userRepository.findById(userId).get();
        CartItem item = cartItemRepository.findById(cartItemId).orElseThrow(()-> new NotfoundException("Product not found"));
        Cart cart = buyer.getCart();


        if (buyer.getCart() == null){
            throw new BadRequestException("You dont have any cart informations, you have to add something to your cart for remove it.");
        }

        cart.getItems().remove(item);
        double summary = cart.getSummary();
        String newPriceWithoutDollarSymbol = item.getProductPrice().substring(1);
        cart.setSummary(summary- Double.parseDouble(newPriceWithoutDollarSymbol));
        userRepository.save(buyer);
        cartItemRepository.delete(item);
        return buyer.getCart();
    }
}

package com.karakoc.ecommerce.carts.controller;


import com.karakoc.ecommerce.carts.service.CartService;
import com.karakoc.ecommerce.carts.model.AddToCartRequest;
import com.karakoc.ecommerce.carts.model.Cart;
import com.karakoc.ecommerce.security.UserPrincipal;
import com.karakoc.ecommerce.users.model.UserDTO;
import com.karakoc.ecommerce.users.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carts")
@AllArgsConstructor
public class CartController {
    private final CartService cartService;
    private final UserService userService;


    @PostMapping
    public Cart postItemToCart(@AuthenticationPrincipal UserPrincipal userPrincipal, @RequestBody AddToCartRequest r) {
        return cartService.addToCart(userPrincipal.getUserId(), r);
    }


    @DeleteMapping("/{id}")
    public Cart deleteItemFromCart(@AuthenticationPrincipal UserPrincipal userPrincipal, @PathVariable String id)  {
        return cartService.removeFromCart(userPrincipal.getUserId(), id);
    }

    @GetMapping("/myCart")
    public Cart getCart(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        UserDTO user = userService.getUserById(userPrincipal.getUserId());
        return user.getCart();
    }

}

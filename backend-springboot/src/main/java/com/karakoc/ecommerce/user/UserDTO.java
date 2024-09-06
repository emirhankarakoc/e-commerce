package com.karakoc.ecommerce.user;

import com.karakoc.ecommerce.carts.Cart;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {
    private String id;
    private String email;
    private String role;
    private String fullName;
    private double balance;
    private String profilePhotoPath;
    private Cart cart;
}

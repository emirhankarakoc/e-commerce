package com.karakoc.ecommerce.users.model;

import com.karakoc.ecommerce.carts.model.Cart;
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

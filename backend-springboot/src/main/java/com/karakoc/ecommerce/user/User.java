package com.karakoc.ecommerce.user;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.karakoc.ecommerce.carts.Cart;
import com.karakoc.ecommerce.user.adress.Address;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class User {
    @Id
    private String id;
    private String email;
    @JsonIgnore
    private String password;
    private String role;
    //TODO  put user yap ve fullname eklet.

    private String fullName;

    @OneToOne
    @JoinColumn(name = "cartId")
    private Cart cart;

    @OneToMany
    @JoinColumn(name = "adressId")
    private List<Address> addresses;

    @Column(columnDefinition = "TEXT")
    private String profilePhotoPath;
    private String profilePhotoCloudId;
    private String imageId;

    public static UserDTO userToDTO(User user){
        var dto = UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole())
                .cart(user.getCart())
                .profilePhotoPath(user.getProfilePhotoPath())
                .fullName(user.getFullName())
                .build();
        return dto;
    }
    public static List<UserDTO> usersToDTOS(List<User> userlist){
        List<UserDTO> response = new ArrayList<>();
        for (User user : userlist){
            response.add(userToDTO(user));
        }
        return response;
    }
}

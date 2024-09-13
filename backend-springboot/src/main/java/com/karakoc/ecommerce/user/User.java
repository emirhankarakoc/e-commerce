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

    private String fullName;

    private String cartId;

    @OneToMany
    @JoinColumn(name = "adressId")
    private List<Address> addresses;

    @Column(columnDefinition = "TEXT")
    private String profilePhotoPath;
    private String profilePhotoCloudId;
    private String imageId;



}

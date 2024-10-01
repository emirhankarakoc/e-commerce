package com.karakoc.ecommerce.users.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.karakoc.ecommerce.adress.model.Address;
import jakarta.persistence.*;
import lombok.Data;

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

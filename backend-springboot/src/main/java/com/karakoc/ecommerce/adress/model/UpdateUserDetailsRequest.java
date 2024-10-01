package com.karakoc.ecommerce.adress.model;


import lombok.Data;

@Data
public class UpdateUserDetailsRequest {
    private String email;
    private String fullName;
}

package com.karakoc.ecommerce.account.requests;


import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String password;
}

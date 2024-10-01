package com.karakoc.ecommerce.adress.model;

import lombok.Data;

@Data
public class CreateAdressRequest {
    private String title;
    private String phoneNumber;
    private String fullAddress;
}

package com.karakoc.ecommerce.user.adress.requests;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class CreateAdressRequest {
    private String title;
    private String phoneNumber;
    private String fullAddress;
}

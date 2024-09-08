package com.karakoc.ecommerce.user.adress.requests;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.karakoc.ecommerce.carts.Cart;
import com.karakoc.ecommerce.user.adress.Address;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
public class UpdateUserDetailsRequest {
    private String email;

    private String fullName;


}

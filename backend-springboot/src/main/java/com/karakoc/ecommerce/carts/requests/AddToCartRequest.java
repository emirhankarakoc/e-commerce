package com.karakoc.ecommerce.carts.requests;

import lombok.Data;

@Data
public class AddToCartRequest {
    private String productId;
    private String productColor;
    private String productMemory;

}

package com.karakoc.ecommerce.carts.model;

import lombok.Data;

@Data
public class AddToCartRequest {
    private String productId;
    private String productColor;
    private String productMemory;

}

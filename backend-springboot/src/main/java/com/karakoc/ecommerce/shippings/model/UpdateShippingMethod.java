package com.karakoc.ecommerce.shippings.model;

import lombok.Data;

@Data
public class UpdateShippingMethod {
    private String name;
    private String description;
    private double cost;
}

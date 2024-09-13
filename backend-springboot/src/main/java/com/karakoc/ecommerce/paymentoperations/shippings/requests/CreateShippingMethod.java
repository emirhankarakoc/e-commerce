package com.karakoc.ecommerce.paymentoperations.shippings.requests;

import lombok.Data;

@Data
public class CreateShippingMethod {
    private String name;
    private String description;
    private double cost;

}

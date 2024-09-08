package com.karakoc.ecommerce.orders.shippings.requests;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class CreateShippingMethod {
    private String name;
    private String description;
    private double cost;

}

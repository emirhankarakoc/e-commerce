package com.karakoc.ecommerce.shippings.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class ShippingMethod {
    @Id
    private String id;
    private String name;
    @Column(columnDefinition= "TEXT")
    private String description;
    private double cost;
}

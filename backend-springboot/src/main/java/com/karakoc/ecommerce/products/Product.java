package com.karakoc.ecommerce.products;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Product {
    @Id
    private String id;
    private String brandName;
    private String battery;
    private String memory;
    private String modelName;
    private String price;
    private String rating;
    private String imageUrl;
}

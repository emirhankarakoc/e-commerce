package com.karakoc.ecommerce.cloudinary.entity;

import com.karakoc.ecommerce.products.ProductType;
import com.karakoc.ecommerce.products.Product;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Image {
    @Id
    private String id;
    private String name;
    private String imageUrl;
    private String cloudImageId;

    @Enumerated(EnumType.STRING)
    private ProductType productType;


    public Image(String name, String imageUrl, String cloudImageId, ProductType productType) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
        this.imageUrl = imageUrl;
        this.cloudImageId = cloudImageId;
        this.productType = productType;
    }


}

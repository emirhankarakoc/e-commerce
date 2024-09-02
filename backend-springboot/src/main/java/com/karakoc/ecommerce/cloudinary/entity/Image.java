package com.karakoc.ecommerce.cloudinary.entity;


import com.karakoc.ecommerce.products.ProductType;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
public class Image {
    @Id
    private String id;
    private String name;
    private String imageUrl;
    private String imageId;

    @Enumerated
    private ProductType productType;

    public Image(String name, String imageUrl, String imageId, ProductType productType) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
        this.imageUrl = imageUrl;
        this.imageId = imageId;
        this.productType = productType;
    }

}

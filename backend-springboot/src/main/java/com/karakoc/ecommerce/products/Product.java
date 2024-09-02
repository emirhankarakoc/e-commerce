package com.karakoc.ecommerce.products;

import com.karakoc.ecommerce.cloudinary.entity.Image;
import com.karakoc.ecommerce.reviews.Review;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Product {
    @Id
    private String id;
    private String brandName;
    private String modelName;
    private String price;

    @OneToMany
    @JoinColumn(name = "imageId")
    public List<Image> images;

    @OneToMany
    @JoinColumn(name = "reviewId")
    private List<Review> reviews;
}

package com.karakoc.ecommerce.products;

import com.karakoc.ecommerce.smartphones.colors.Color;
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
    private String oldPrice;

    @OneToMany
    @JoinColumn(name = "imageId")
    private List<Image> images;

    @OneToMany
    @JoinColumn(name = "colorId")
    private List<Color> colors;


    @OneToMany
    @JoinColumn(name = "reviewId") // Corrected annotation
    private List<Review> reviews;
}

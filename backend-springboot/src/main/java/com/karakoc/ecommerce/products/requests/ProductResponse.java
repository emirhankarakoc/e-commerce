package com.karakoc.ecommerce.products.requests;

import com.karakoc.ecommerce.smartphones.colors.Color;
import com.karakoc.ecommerce.cloudinary.entity.ImageDTO;
import com.karakoc.ecommerce.reviews.Review;
import lombok.Data;

import java.util.List;

@Data
public class ProductResponse {
    private String id;
    private String brandName;
    private String modelName;
    private String price;
    private String oldPrice;
    private List<Color> colors;
    private List<ImageDTO> images;
    private List<Review> reviews;





}

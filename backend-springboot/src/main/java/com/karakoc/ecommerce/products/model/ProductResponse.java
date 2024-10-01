package com.karakoc.ecommerce.products.model;

import com.karakoc.ecommerce.colors.model.Color;
import com.karakoc.ecommerce.cloudinary.model.ImageDTO;
import com.karakoc.ecommerce.reviews.model.Review;
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

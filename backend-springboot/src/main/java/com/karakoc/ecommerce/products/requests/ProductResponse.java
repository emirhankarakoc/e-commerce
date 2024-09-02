package com.karakoc.ecommerce.products.requests;

import com.karakoc.ecommerce.cloudinary.entity.Image;
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
    private List<ImageDTO> imageLinks;
    private List<Review> reviews;




}

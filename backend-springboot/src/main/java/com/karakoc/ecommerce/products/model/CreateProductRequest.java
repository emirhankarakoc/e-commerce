package com.karakoc.ecommerce.products.model;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CreateProductRequest {
    private String brandName;
    private String battery;
    private String memory;
    private String modelName;
    private String price;
    private String rating;
    private MultipartFile multipartFile;
}

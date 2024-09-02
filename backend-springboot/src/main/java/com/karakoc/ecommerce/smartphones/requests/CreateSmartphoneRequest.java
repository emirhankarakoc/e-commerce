package com.karakoc.ecommerce.smartphones.requests;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CreateSmartphoneRequest {
    private MultipartFile[] multipartFiles; // Birden fazla dosya için dizi
    private String brandName;
    private String modelName;
    private String price;
    private String screenSize;
    private String cpu;
    private String numberOfCores;
    private String memory;
    private String battery;
    private String description;
    private String screenDiagonal;
    private String screenResolution;
    private String screenRefreshRate;
    private String pixelDensity;
    private String screenType;
    private String additionaly;
}

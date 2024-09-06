package com.karakoc.ecommerce.smartphones.requests;

import lombok.Data;

@Data
public class UpdateSmartphoneRequest {
    private String[] colorCodes;
    private String[] memoryOptions;
    private String brandName;
    private String modelName;
    private String price;
    private String oldPrice;
    private String description;
    private String frontCameraProps;
    private String mainCameraProps;
    private String guaranteeOption;
    private String screenSize;
    private String cpu;
    private String numberOfCores;
    private String battery;
    private String descriptionDetails;
    private String screenDiagonal;
    private String screenResolution;
    private String screenRefreshRate;
    private String pixelDensity;
    private String screenType;
    private String additionaly;
}

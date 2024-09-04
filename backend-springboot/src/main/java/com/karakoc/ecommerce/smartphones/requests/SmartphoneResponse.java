package com.karakoc.ecommerce.smartphones.requests;

import com.karakoc.ecommerce.products.requests.ProductResponse;
import com.karakoc.ecommerce.smartphones.details.Details;
import com.karakoc.ecommerce.smartphones.memories.Memory;
import lombok.Data;

import java.util.List;

@Data
public class SmartphoneResponse extends ProductResponse {
    private String cpu;
    private String numberOfCores;
    private List<Memory> memoryOptions;
    private String battery;
    private String screenSize;
    private String description;
    private Details details;
    private String frontCameraProps;
    private String mainCameraProps;
    private String guaranteeOption;
}

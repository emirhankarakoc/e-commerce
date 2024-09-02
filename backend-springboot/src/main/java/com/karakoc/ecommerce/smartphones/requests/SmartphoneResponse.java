package com.karakoc.ecommerce.smartphones.requests;

import com.karakoc.ecommerce.products.requests.ProductResponse;
import lombok.Data;

@Data
public class SmartphoneResponse extends ProductResponse {
    private String cpu;
    private String numberOfCores;
    private String memory;
    private String battery;
    private String screenSize;

}

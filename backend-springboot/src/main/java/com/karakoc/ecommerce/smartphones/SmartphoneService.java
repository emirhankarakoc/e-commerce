package com.karakoc.ecommerce.smartphones;


import com.karakoc.ecommerce.cloudinary.entity.Image;
import com.karakoc.ecommerce.products.ProductType;
import com.karakoc.ecommerce.smartphones.requests.CreateSmartphoneRequest;
import com.karakoc.ecommerce.smartphones.requests.SmartphoneResponse;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface SmartphoneService {


    Smartphone createSmartphone(CreateSmartphoneRequest request);
    SmartphoneResponse getSmartphone(String id);

    List<SmartphoneResponse> getAllSmartphones();


}

package com.karakoc.ecommerce.smartphones;


import com.karakoc.ecommerce.cloudinary.entity.Image;
import com.karakoc.ecommerce.products.ProductType;
import com.karakoc.ecommerce.smartphones.requests.CreateSmartphoneRequest;
import com.karakoc.ecommerce.smartphones.requests.SmartphoneResponse;
import com.karakoc.ecommerce.smartphones.requests.UpdateSmartphoneRequest;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;
import java.util.List;

public interface SmartphoneService {


    Smartphone createSmartphone(CreateSmartphoneRequest request);
    SmartphoneResponse getSmartphone(String id);
    String deleteSmartphone(String id) throws IOException;
    List<SmartphoneResponse> getAllSmartphones();

    String updateSmartphone(String id, UpdateSmartphoneRequest smartphone);

}

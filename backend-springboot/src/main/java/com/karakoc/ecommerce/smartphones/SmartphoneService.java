package com.karakoc.ecommerce.smartphones;


import com.karakoc.ecommerce.smartphones.colors.Color;
import com.karakoc.ecommerce.smartphones.colors.CreateColorRequest;
import com.karakoc.ecommerce.smartphones.memories.CreateMemoryRequest;
import com.karakoc.ecommerce.smartphones.memories.Memory;
import com.karakoc.ecommerce.smartphones.requests.CreateSmartphoneRequest;
import com.karakoc.ecommerce.smartphones.requests.UpdateSmartphoneRequest;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;
import java.util.List;

public interface SmartphoneService {


    Smartphone createSmartphone(CreateSmartphoneRequest request);
    Smartphone getSmartphone(String id);
    String deleteSmartphone(String id) throws IOException;
    List<Smartphone> getAllSmartphones();
    public Smartphone updateSmartphoneById(String smartphoneId, UpdateSmartphoneRequest r) throws IOException;

}

package com.karakoc.ecommerce.smartphones.service;


import com.karakoc.ecommerce.smartphones.model.Smartphone;
import com.karakoc.ecommerce.smartphones.model.CreateSmartphoneRequest;
import com.karakoc.ecommerce.smartphones.model.UpdateSmartphoneRequest;

import java.io.IOException;
import java.util.List;

public interface SmartphoneService {


    Smartphone createSmartphone(CreateSmartphoneRequest request);
    Smartphone getSmartphone(String id);
    String deleteSmartphone(String id) throws IOException;
    List<Smartphone> getAllSmartphones();
    public Smartphone updateSmartphoneById(String smartphoneId, UpdateSmartphoneRequest r) throws IOException;

}

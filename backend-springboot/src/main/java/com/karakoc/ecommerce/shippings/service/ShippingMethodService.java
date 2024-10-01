package com.karakoc.ecommerce.shippings.service;

import com.karakoc.ecommerce.shippings.model.ShippingMethod;
import com.karakoc.ecommerce.shippings.model.CreateShippingMethod;
import com.karakoc.ecommerce.shippings.model.UpdateShippingMethod;

import java.util.List;

public interface ShippingMethodService {
    public List<ShippingMethod> getShippingMethods();
    ShippingMethod createShippingMethod(CreateShippingMethod r);
    ShippingMethod getShippingMethod(String id);
    ShippingMethod putShippingMethod(UpdateShippingMethod r, String methodId);
    void deleteShippingMethod(String id);

}

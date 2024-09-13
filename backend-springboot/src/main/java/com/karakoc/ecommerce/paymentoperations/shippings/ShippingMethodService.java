package com.karakoc.ecommerce.paymentoperations.shippings;

import com.karakoc.ecommerce.paymentoperations.shippings.requests.CreateShippingMethod;

import java.util.List;

public interface ShippingMethodService {
    public List<ShippingMethod> getShippingMethods();
    ShippingMethod createShippingMethod(CreateShippingMethod r);
    ShippingMethod getShippingMethod(String id);

}

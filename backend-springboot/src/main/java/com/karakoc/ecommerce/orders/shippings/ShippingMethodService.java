package com.karakoc.ecommerce.orders.shippings;

import com.karakoc.ecommerce.orders.shippings.requests.CreateShippingMethod;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface ShippingMethodService {
    public List<ShippingMethod> getShippingMethods();
    ShippingMethod createShippingMethod(CreateShippingMethod r);
    ShippingMethod getShippingMethod(String id);

}

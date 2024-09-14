package com.karakoc.ecommerce.paymentoperations.shippings;

import com.karakoc.ecommerce.paymentoperations.shippings.requests.CreateShippingMethod;
import com.karakoc.ecommerce.paymentoperations.shippings.requests.UpdateShippingMethod;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface ShippingMethodService {
    public List<ShippingMethod> getShippingMethods();
    ShippingMethod createShippingMethod(CreateShippingMethod r);
    ShippingMethod getShippingMethod(String id);
    ShippingMethod putShippingMethod(UpdateShippingMethod r, String methodId);
    void deleteShippingMethod(String id);

}

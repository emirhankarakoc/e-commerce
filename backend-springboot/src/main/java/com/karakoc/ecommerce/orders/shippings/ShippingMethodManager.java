package com.karakoc.ecommerce.orders.shippings;

import com.karakoc.ecommerce.exceptions.general.NotfoundException;
import com.karakoc.ecommerce.orders.shippings.requests.CreateShippingMethod;
import com.sun.security.auth.UnixNumericUserPrincipal;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ShippingMethodManager implements ShippingMethodService {




    private final ShippingMethodRepository repository;


    public List<ShippingMethod> getShippingMethods() {
        return repository.findAll();
    }

    public ShippingMethod createShippingMethod(CreateShippingMethod r) {
        ShippingMethod shippingMethod = new ShippingMethod();
        shippingMethod.setId(UUID.randomUUID().toString());
        shippingMethod.setName(r.getName());
        shippingMethod.setDescription(r.getDescription());
        shippingMethod.setCost(r.getCost());
        return repository.save(shippingMethod);

    }

    @Override
    public ShippingMethod getShippingMethod(String id) {
        return repository.findById(id).orElseThrow(()->new NotfoundException("Shipping Method not found."));
    }
}

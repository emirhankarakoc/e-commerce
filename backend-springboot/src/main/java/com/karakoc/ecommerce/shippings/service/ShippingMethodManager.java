package com.karakoc.ecommerce.shippings.service;

import com.karakoc.ecommerce.exceptions.general.NotfoundException;
import com.karakoc.ecommerce.shippings.model.ShippingMethod;
import com.karakoc.ecommerce.shippings.repository.ShippingMethodRepository;
import com.karakoc.ecommerce.shippings.model.CreateShippingMethod;
import com.karakoc.ecommerce.shippings.model.UpdateShippingMethod;
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

    @Override
    public ShippingMethod putShippingMethod(UpdateShippingMethod r, String methodId) {
        ShippingMethod m = repository.findById(methodId).orElseThrow(()-> new NotfoundException("Shipping Method not found."));
        m.setName(r.getName());
        m.setCost(r.getCost());
        m.setDescription(r.getDescription());
        return repository.save(m);
    }

    @Override
    public void deleteShippingMethod(String id) {
        repository.deleteById(id);
    }
}

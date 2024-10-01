package com.karakoc.ecommerce.shippings.controller;


import com.karakoc.ecommerce.shippings.model.ShippingMethod;
import com.karakoc.ecommerce.shippings.service.ShippingMethodService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shippingmethods")
@AllArgsConstructor
public class ShippingMethodController {
    private final ShippingMethodService service;





    @GetMapping
    public List<ShippingMethod> getShippingMethods() {
        return service.getShippingMethods();
    }
    @GetMapping("/{id}")
    public ShippingMethod getShippingMethod(@PathVariable String id) {
        return service.getShippingMethod(id);
    }

}

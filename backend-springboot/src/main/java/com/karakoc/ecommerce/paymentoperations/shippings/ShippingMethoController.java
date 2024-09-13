package com.karakoc.ecommerce.paymentoperations.shippings;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shippingmethods")
@AllArgsConstructor
public class ShippingMethoController {
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

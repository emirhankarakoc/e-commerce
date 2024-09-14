package com.karakoc.ecommerce.user.controllers;


import com.karakoc.ecommerce.paymentoperations.PaymentOperation;
import com.karakoc.ecommerce.paymentoperations.PaymentOperationService;
import com.karakoc.ecommerce.paymentoperations.requests.PaymentOperationResponse;
import com.karakoc.ecommerce.paymentoperations.shippings.ShippingMethod;
import com.karakoc.ecommerce.paymentoperations.shippings.ShippingMethodService;
import com.karakoc.ecommerce.paymentoperations.shippings.requests.CreateShippingMethod;
import com.karakoc.ecommerce.security.UserPrincipal;
import com.karakoc.ecommerce.smartphones.Smartphone;
import com.karakoc.ecommerce.smartphones.SmartphoneRepository;
import com.karakoc.ecommerce.smartphones.SmartphoneService;
import com.karakoc.ecommerce.smartphones.requests.UpdateSmartphoneRequest;
import com.karakoc.ecommerce.user.UserDTO;
import com.karakoc.ecommerce.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/admins")
@AllArgsConstructor
public class AdminController {

    private final SmartphoneRepository smartphoneRepository;
    private final UserService userService;
    private final SmartphoneService smartphoneService;
    private final ShippingMethodService shippingMethodService;
    private final PaymentOperationService paymentOperationService;


    @GetMapping("/smartphones")
    public List<Smartphone> getAllSmartphones() {
        return smartphoneRepository.findAll();
    }
    @DeleteMapping("/smartphones/{id}")
    public String deleteSmartphone(@PathVariable String id) throws IOException {
        return smartphoneService.deleteSmartphone(id);
    }
    @GetMapping("/orders")
    public List<PaymentOperation> getAllOrders(){
            return paymentOperationService.getAllOrders();
    }
    @GetMapping("/users")
    public List<UserDTO> getAllUsers(){
        return userService.getAllUsers();
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable String  id) throws IOException {
        return userService.deleteUser(id);
    }

    @PutMapping("/users/{id}")
    public String updateUser(@PathVariable String id, @RequestBody UserDTO userDTO) {
        return userService.updateUser(id,userDTO);
    }
    @PostMapping("/shipping-methods")
    public ShippingMethod postShippingMethod(@RequestBody CreateShippingMethod r){
        return shippingMethodService.createShippingMethod(r);
    }


}

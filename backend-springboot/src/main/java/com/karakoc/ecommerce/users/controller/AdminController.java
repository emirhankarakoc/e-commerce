package com.karakoc.ecommerce.users.controller;


import com.karakoc.ecommerce.paymentoperations.service.PaymentOperationService;
import com.karakoc.ecommerce.paymentoperations.model.PaymentOperationResponse;
import com.karakoc.ecommerce.shippings.model.ShippingMethod;
import com.karakoc.ecommerce.shippings.service.ShippingMethodService;
import com.karakoc.ecommerce.shippings.model.CreateShippingMethod;
import com.karakoc.ecommerce.shippings.model.UpdateShippingMethod;
import com.karakoc.ecommerce.smartphones.model.Smartphone;
import com.karakoc.ecommerce.smartphones.repository.SmartphoneRepository;
import com.karakoc.ecommerce.smartphones.service.SmartphoneService;
import com.karakoc.ecommerce.users.model.UserDTO;
import com.karakoc.ecommerce.users.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public List<PaymentOperationResponse> getAllOrders(){
            return paymentOperationService.getAllOrders();
    }

    @PutMapping("/orders/sent/{id}")
    public ResponseEntity setPaymentStatusToSent(@PathVariable String id) {
         paymentOperationService.setPaymentStatusToSent(id);
         return ResponseEntity.ok("Order status updated to SENT successfully.");
    }
    @PutMapping("/orders/finished/{id}")
    public ResponseEntity setPaymentStatusToFinished(@PathVariable String id) {
         paymentOperationService.setPaymentStatusToFinished(id);
        return ResponseEntity.ok("Order status updated to FINISHED successfully.");

    }   @PutMapping("/orders/preparing/{id}")
    public ResponseEntity setPaymentStatusToPreparing(@PathVariable String id) {
         paymentOperationService.setPaymentStatusToPreparing(id);
        return ResponseEntity.ok("Order status updated to PREPARING successfully.");

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
    @PutMapping("/shipping-methods/{id}")
    public ShippingMethod putShippingMethod(@RequestBody UpdateShippingMethod r, @PathVariable String id){
        return shippingMethodService.putShippingMethod(r,id);
    }
    @DeleteMapping("/shipping-methods/{id}")
    public void deleteShippingMethod(@PathVariable String id){
        shippingMethodService.deleteShippingMethod(id);
    }


}

package com.karakoc.ecommerce.user.controllers;


import com.karakoc.ecommerce.cloudinary.entity.Image;
import com.karakoc.ecommerce.products.ProductType;
import com.karakoc.ecommerce.smartphones.Smartphone;
import com.karakoc.ecommerce.smartphones.SmartphoneRepository;
import com.karakoc.ecommerce.smartphones.SmartphoneService;
import com.karakoc.ecommerce.smartphones.requests.CreateSmartphoneRequest;
import com.karakoc.ecommerce.smartphones.requests.UpdateSmartphoneRequest;
import com.karakoc.ecommerce.user.UserDTO;
import com.karakoc.ecommerce.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/admins")
@AllArgsConstructor
public class AdminController {

    private final SmartphoneRepository smartphoneRepository;
    private final UserService userService;
    private final SmartphoneService smartphoneService;;


    @GetMapping("/smartphones")
    public List<Smartphone> getAllSmartphones() {
        return smartphoneRepository.findAll();
    }
    @DeleteMapping("/smartphones/{id}")
    public String deleteSmartphone(@PathVariable String id) throws IOException {
        return smartphoneService.deleteSmartphone(id);
    }
    @PutMapping("/smartphone/{id}/basic")
    public String updateSmartphoneBasic(@PathVariable String id, @RequestBody UpdateSmartphoneRequest smartphone) {
        return smartphoneService.updateSmartphoneBasics(id,smartphone);
    }


    @GetMapping("/users")
    public List<UserDTO> getAllUsers(){
        return userService.getAllUsers();
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable String  id) {
        return userService.deleteUser(id);
    }

    @PutMapping("/users/{id}")
    public String updateUser(@PathVariable String id, @RequestBody UserDTO userDTO) {
        return userService.updateUser(id,userDTO);
    }


}

package com.karakoc.ecommerce.users.controller;

import com.karakoc.ecommerce.security.UserPrincipal;
import com.karakoc.ecommerce.users.model.User;
import com.karakoc.ecommerce.users.model.UserDTO;
import com.karakoc.ecommerce.users.service.UserService;
import com.karakoc.ecommerce.adress.model.Address;
import com.karakoc.ecommerce.adress.model.CreateAdressRequest;
import com.karakoc.ecommerce.adress.model.UpdateAdressRequest;
import com.karakoc.ecommerce.adress.model.UpdateUserDetailsRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequestMapping("/users")
@RestController
@AllArgsConstructor
public class UserController {
    private final UserService userService;


    @GetMapping("/by-mail/{email}")
    public UserDTO getUserByEmail(@PathVariable String email){
        return userService.getUserByEmail(email);
    }

    @GetMapping("/by-id/{id}")
    public UserDTO getUserById(@PathVariable String id){
        return userService.getUserById(id);
    }


    @PostMapping("/addresses")
    public Address postAdress(@AuthenticationPrincipal UserPrincipal principal, @RequestBody CreateAdressRequest r){
        return userService.createAdress(principal.getUserId(),r);
    }

    @GetMapping("/addresses")
    public List<Address> getUserAdresses(@AuthenticationPrincipal UserPrincipal principal){
        return userService.getUserAdresses(principal.getUserId());
    }

    @GetMapping("/addresses/{id}")
    public Address getAdress(@AuthenticationPrincipal UserPrincipal principal,@PathVariable String id){
        return userService.getAdress(principal.getUserId(),id);
    }
    @DeleteMapping("/addresses/{id}")
    public void deleteUserAdress(@AuthenticationPrincipal UserPrincipal principal, @PathVariable String id){
        userService.deleteUserAdress(principal.getUserId(),id);
    }
    @PutMapping("/addresses/{id}")
    public Address updateUserAdress(@AuthenticationPrincipal UserPrincipal principal, @RequestBody UpdateAdressRequest r, @PathVariable String id){
        return userService.updateUserAdress(principal.getUserId(),r,id);
    }
    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE, value = "/picture")
    public User changeProfilePicture(@ModelAttribute MultipartFile picture , @AuthenticationPrincipal UserPrincipal principal) throws IOException {
    return userService.changeProfilePicture(picture,principal.getUserId());
    }

    @PutMapping
    public User changeUserDetails(@AuthenticationPrincipal UserPrincipal principal,@RequestBody UpdateUserDetailsRequest r){
        return userService.changeUserDetails(principal.getUserId(),r);
    }


    //create user method must not be here.
    //must be in Account Controller.






}

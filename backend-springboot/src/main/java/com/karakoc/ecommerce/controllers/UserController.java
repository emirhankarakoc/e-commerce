package com.karakoc.ecommerce.controllers;

import com.karakoc.ecommerce.user.UserDTO;
import com.karakoc.ecommerce.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/users")
@RestController
@AllArgsConstructor
public class UserController {
    private final UserService userService;


    @GetMapping("/{email}")
    public UserDTO getUserByEmail(@PathVariable String email){
        return userService.getUserByEmail(email);
    }

    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable String id){
        return userService.getUserById(id);
    }

    //create user method must not be here.
    //must be in Account Controller.






}

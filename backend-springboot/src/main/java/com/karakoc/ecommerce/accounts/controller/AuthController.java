package com.karakoc.ecommerce.accounts.controller;

import com.karakoc.ecommerce.accounts.service.AuthService;
import com.karakoc.ecommerce.accounts.model.LoginRequest;
import com.karakoc.ecommerce.accounts.model.LoginResponse;
import com.karakoc.ecommerce.accounts.model.RegisterRequest;
import com.karakoc.ecommerce.users.model.UserDTO;
import com.karakoc.ecommerce.security.UserPrincipal;
import com.karakoc.ecommerce.users.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RestController

@RequestMapping("/accounts")
@RequiredArgsConstructor
public class AuthController {


    private final AuthService authService;
    private final UserService userService;


    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
         return authService.attemptLogin(request.getEmail(),request.getPassword());
    }

    @PostMapping("/register")
    public UserDTO register(@RequestBody RegisterRequest request) {
       return authService.attemptRegister(request.getEmail(),request.getPassword());
    }
    @GetMapping("/getme")
    public UserDTO getMe(@AuthenticationPrincipal UserPrincipal principal){
        return userService.getUserByEmail(principal.getEmail());
    }


}

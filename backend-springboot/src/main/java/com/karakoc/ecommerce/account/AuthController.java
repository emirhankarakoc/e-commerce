package com.karakoc.ecommerce.account;

import com.karakoc.ecommerce.account.requests.LoginRequest;
import com.karakoc.ecommerce.account.requests.LoginResponse;
import com.karakoc.ecommerce.account.requests.RegisterRequest;
import com.karakoc.ecommerce.user.UserDTO;
import com.karakoc.ecommerce.security.UserPrincipal;
import com.karakoc.ecommerce.user.UserService;
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

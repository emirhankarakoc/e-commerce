package com.karakoc.sofra.account;

import com.karakoc.sofra.account.requests.LoginRequest;
import com.karakoc.sofra.account.requests.LoginResponse;
import com.karakoc.sofra.account.requests.RegisterRequest;
import com.karakoc.sofra.exceptions.general.BadRequestException;
import com.karakoc.sofra.user.UserDTO;
import com.karakoc.sofra.security.UserPrincipal;
import com.karakoc.sofra.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


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

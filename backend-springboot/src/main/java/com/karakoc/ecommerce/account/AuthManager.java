package com.karakoc.ecommerce.account;

import com.karakoc.ecommerce.account.requests.LoginResponse;
import com.karakoc.ecommerce.user.UserService;
import com.karakoc.ecommerce.exceptions.general.ForbiddenException;
import com.karakoc.ecommerce.user.UserDTO;
import com.karakoc.ecommerce.security.TokenManager;
import com.karakoc.ecommerce.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
@Service

@RequiredArgsConstructor
public class AuthManager implements AuthService{
    private final TokenManager tokenManager;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public LoginResponse attemptLogin(String email, String password) {
       try{
           var authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
           SecurityContextHolder.getContext().setAuthentication(authentication);

           var principal = (UserPrincipal) authentication.getPrincipal();
           var roles = principal.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();

           var token = tokenManager.issue(principal.getUserId(), principal.getEmail(), roles);
           return LoginResponse.builder()
                   .accessToken(token)
                   .build();
       }
       catch (Exception e){
           throw new ForbiddenException("Wrong email or password");
           //i found the error, in 24. row but i cant fixed. so i found this solution. thanks.
       }
    }


    public UserDTO attemptRegister(String email, String password){
        return userService.createUser(email,password);
    }
}

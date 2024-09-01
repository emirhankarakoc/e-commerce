package com.karakoc.ecommerce.account;

import com.karakoc.ecommerce.account.requests.LoginResponse;
import com.karakoc.ecommerce.user.UserDTO;

public interface AuthService {
    LoginResponse attemptLogin(String email, String password);
    UserDTO attemptRegister(String email, String password);
}

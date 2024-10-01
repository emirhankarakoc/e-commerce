package com.karakoc.ecommerce.accounts.service;

import com.karakoc.ecommerce.accounts.model.LoginResponse;
import com.karakoc.ecommerce.users.model.UserDTO;

public interface AuthService {
    LoginResponse attemptLogin(String email, String password);
    UserDTO attemptRegister(String email, String password);
}

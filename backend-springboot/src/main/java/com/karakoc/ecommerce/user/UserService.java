package com.karakoc.ecommerce.user;


import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface UserService {
    UserDTO createUser(String email, String password);
    UserDTO getUserByEmail(String email);
    UserDTO getUserById(String id);
    String deleteUser(String id);
    List<UserDTO> getAllUsers();
    String updateUser(String id, UserDTO userDTO);
}

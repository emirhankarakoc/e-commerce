package com.karakoc.sofra.user;


import java.util.List;

public interface UserService {
    UserDTO createUser(String email, String password);
    UserDTO getUserByEmail(String email);
    UserDTO getUserById(String id);
    String deleteUser(String email);
    List<UserDTO> getAllUsers();
}

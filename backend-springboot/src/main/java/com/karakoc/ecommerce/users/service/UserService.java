package com.karakoc.ecommerce.users.service;


import com.karakoc.ecommerce.adress.model.Address;
import com.karakoc.ecommerce.adress.model.CreateAdressRequest;
import com.karakoc.ecommerce.adress.model.UpdateAdressRequest;
import com.karakoc.ecommerce.adress.model.UpdateUserDetailsRequest;
import com.karakoc.ecommerce.users.model.User;
import com.karakoc.ecommerce.users.model.UserDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserService {
    UserDTO createUser(String email, String password);
    UserDTO getUserByEmail(String email);
    UserDTO getUserById(String id);
    String deleteUser(String id) throws IOException;
    User changeUserDetails(String userId, UpdateUserDetailsRequest r);
    Address getAdress(String userId, String adressId);
    User changeProfilePicture(MultipartFile picture ,String userId) throws IOException;
    void deleteUserAdress(String userId,String id);
    List<UserDTO> getAllUsers();
    String updateUser(String id, UserDTO userDTO);
    Address createAdress(String userId, CreateAdressRequest r);
    List<Address> getUserAdresses(String userId);
    Address updateUserAdress(String userId, UpdateAdressRequest r, String adressId);
}

package com.karakoc.ecommerce.user;


import com.karakoc.ecommerce.security.UserPrincipal;
import com.karakoc.ecommerce.user.adress.Address;
import com.karakoc.ecommerce.user.adress.requests.CreateAdressRequest;
import com.karakoc.ecommerce.user.adress.requests.UpdateAdressRequest;
import com.karakoc.ecommerce.user.adress.requests.UpdateUserDetailsRequest;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserService {
    UserDTO createUser(String email, String password);
    UserDTO getUserByEmail(String email);
    UserDTO getUserById(String id);
    String deleteUser(String id);
    User changeUserDetails(String userId,UpdateUserDetailsRequest r);
    Address getAdress(String userId, String adressId);
    User changeProfilePicture(MultipartFile picture ,String userId) throws IOException;
    void deleteUserAdress(String userId,String id);
    List<UserDTO> getAllUsers();
    String updateUser(String id, UserDTO userDTO);
    Address createAdress(String userId, CreateAdressRequest r);
    List<Address> getUserAdresses(String userId);
    Address updateUserAdress(String userId, UpdateAdressRequest r, String adressId);
}

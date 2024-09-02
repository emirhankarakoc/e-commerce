package com.karakoc.ecommerce.user;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class User {
    @Id
    private String id;
    private String email;
    @JsonIgnore
    private String password;
    private String role;
    //TODO  put user yap, resim ve fullname eklet.
    private String profilePhotoPath;
    private String fullName;



    public static UserDTO userToDTO(User user){
        var dto = UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
        return dto;
    }
    public static List<UserDTO> usersToDTOS(List<User> userlist){
        List<UserDTO> response = new ArrayList<>();
        for (User user : userlist){
            response.add(userToDTO(user));
        }
        return response;
    }
}

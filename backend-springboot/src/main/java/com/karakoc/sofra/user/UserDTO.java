package com.karakoc.sofra.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {
    private String id;
    private String email;
    private String role;
    private String extraInfo;
    private double balance;
}

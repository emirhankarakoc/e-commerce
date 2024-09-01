package com.karakoc.ecommerce.user;

import com.karakoc.ecommerce.exceptions.general.BadRequestException;
import com.karakoc.ecommerce.exceptions.general.NotfoundException;
import com.karakoc.ecommerce.exceptions.strings.ExceptionMessages;
import com.karakoc.ecommerce.security.WebSecurityConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import static com.karakoc.ecommerce.user.User.usersToDTOS;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserManager implements UserService{

    private final UserRepository repository;
    private final ExceptionMessages messages;
    private final WebSecurityConfig webSecurityConfig;

    @Override
    public UserDTO createUser(String email, String password) {

        if (repository.findUserByEmail(email).isPresent()) {
            throw new BadRequestException("Email already exists");
        }

        User user = new User();
        user.setId(UUID.randomUUID().toString());
        user.setEmail(email);
        user.setPassword(webSecurityConfig.passwordEncoder().encode(password));
        user.setRole(Roles.ROLE_USER.toString());
        return User.userToDTO(repository.save(user));
    }
    @Override
    public UserDTO getUserByEmail(String email){
        User user = repository.findUserByEmail(email).orElseThrow(()-> new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        var dto = User.userToDTO(user);
        return dto;
    }

    @Override
    public UserDTO getUserById(String id) {
        User user = repository.findUserByEmail(id).orElseThrow(()-> new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        var dto = User.userToDTO(user);
        return dto;
    }

    @Override
    public String deleteUser(String email){
        User user = repository.findUserByEmail(email).orElseThrow(()-> new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        repository.delete(user);
        return "An user deleted with given email adress:" + user.getEmail();
    }


    public List<UserDTO> getAllUsers(){
        var allusers = repository.findAll();
        return usersToDTOS(allusers);
    }


}

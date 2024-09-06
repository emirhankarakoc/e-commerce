package com.karakoc.ecommerce.user;

import com.karakoc.ecommerce.carts.Cart;
import com.karakoc.ecommerce.carts.CartRepository;
import com.karakoc.ecommerce.carts.item.CartItem;
import com.karakoc.ecommerce.carts.item.CartItemRepository;
import com.karakoc.ecommerce.exceptions.general.BadRequestException;
import com.karakoc.ecommerce.exceptions.general.NotfoundException;
import com.karakoc.ecommerce.exceptions.strings.ExceptionMessages;
import com.karakoc.ecommerce.WebSecurityConfig;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;

    @Override
    public UserDTO createUser(String email, String password) {

        if (repository.findUserByEmail(email).isPresent()) {
            throw new BadRequestException("Email already exists");
        }
        Cart cart = new Cart();
        cart.setId(UUID.randomUUID().toString());
        cart.setItems(new ArrayList<>());
        cart.setSummary(0);
        cartRepository.save(cart);

        User user = new User();
        user.setId(UUID.randomUUID().toString());
        user.setEmail(email);
        user.setPassword(webSecurityConfig.passwordEncoder().encode(password));
        user.setRole(Roles.ROLE_USER.toString());
        user.setCart(cart);


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
        User user = repository.findById(id).orElseThrow(()-> new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        var dto = User.userToDTO(user);
        return dto;
    }

    @Override
    @Transactional
    public String deleteUser(String id){
        User user = repository.findById(id).orElseThrow(()-> new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        Cart cart = user.getCart();
        List<CartItem> items = cart.getItems();
        cartItemRepository.deleteAll(items);
        cartRepository.delete(user.getCart());
        repository.delete(user);
        return "An user deleted with given email adress:" + user.getEmail();
    }

    @Override
    public String updateUser(String id, UserDTO userDTO) {
        User user = repository.findById(id).orElseThrow(()-> new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        user.setEmail(userDTO.getEmail());
        user.setRole(userDTO.getRole());
        user.setFullName(userDTO.getFullName());
        user.setProfilePhotoPath(userDTO.getProfilePhotoPath());
        userRepository.save(user);
        return "An user updated with given email adress:" + user.getEmail();

    }

    public List<UserDTO> getAllUsers(){
        var allusers = repository.findAll();
        return usersToDTOS(allusers);
    }


}

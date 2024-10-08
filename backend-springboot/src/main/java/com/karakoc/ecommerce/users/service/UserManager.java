package com.karakoc.ecommerce.users.service;

import com.karakoc.ecommerce.carts.model.Cart;
import com.karakoc.ecommerce.carts.repository.CartRepository;
import com.karakoc.ecommerce.cartitems.model.CartItem;
import com.karakoc.ecommerce.cartitems.repository.CartItemRepository;
import com.karakoc.ecommerce.cloudinary.model.Image;
import com.karakoc.ecommerce.cloudinary.repository.ImageRepository;
import com.karakoc.ecommerce.cloudinary.service.CloudinaryService;
import com.karakoc.ecommerce.exceptions.general.BadRequestException;
import com.karakoc.ecommerce.exceptions.general.ForbiddenException;
import com.karakoc.ecommerce.exceptions.general.NotfoundException;
import com.karakoc.ecommerce.exceptions.strings.ExceptionMessages;
import com.karakoc.ecommerce.security.WebSecurityConfig;
import com.karakoc.ecommerce.adress.model.Address;
import com.karakoc.ecommerce.adress.repository.AdressRepository;
import com.karakoc.ecommerce.adress.model.CreateAdressRequest;
import com.karakoc.ecommerce.adress.model.UpdateAdressRequest;
import com.karakoc.ecommerce.adress.model.UpdateUserDetailsRequest;
import com.karakoc.ecommerce.users.model.Roles;
import com.karakoc.ecommerce.users.model.User;
import com.karakoc.ecommerce.users.model.UserDTO;
import com.karakoc.ecommerce.users.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;


@Service
@Slf4j
@RequiredArgsConstructor
public class UserManager implements UserService {

    private final UserRepository repository;
    private final ExceptionMessages messages;
    private final WebSecurityConfig webSecurityConfig;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final AdressRepository adressRepository;
    private final CloudinaryService cloudinaryService;
    private final ImageRepository imageRepository;

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
        user.setCartId(cart.getId());
        user.setAddresses(new ArrayList<>());


        return userToDTO(repository.save(user));
    }
    @Override
    public UserDTO getUserByEmail(String email){
        User user = repository.findUserByEmail(email).orElseThrow(()-> new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        var dto = userToDTO(user);
        return dto;
    }

    @Override
    public UserDTO getUserById(String id) {
        User user = repository.findById(id).orElseThrow(()-> new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        var dto = userToDTO(user);
        return dto;
    }

    @Override
    public User changeUserDetails(String userId, UpdateUserDetailsRequest r) {
        User user = repository.findById(userId).orElseThrow(()-> new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        user.setEmail(r.getEmail());
        user.setFullName(r.getFullName());
        return userRepository.save(user);
    }

    @Override
    public Address getAdress(String userId, String adressId) {
        User user = repository.findById(userId).orElseThrow(()-> new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        Address address = adressRepository.findById(adressId).orElseThrow(()-> new NotfoundException("Adress not found."));
        if (user.getAddresses().contains(address)) {
          return address;
        }
        else{
            throw new ForbiddenException("You are now owner for this adress. Please don't try hacking.");
        }
    }

    @Override
    @Transactional
    public String deleteUser(String id) throws IOException {
        User user = repository.findById(id).orElseThrow(()-> new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        String imageCloudId= user.getProfilePhotoCloudId();
        imageRepository.deleteById(user.getImageId());
        Cart cart = cartRepository.findById(user.getCartId()).orElseThrow(()->new NotfoundException("Cart not found."));
        List<CartItem> items = cart.getItems();
        cartItemRepository.deleteAll(items);
        cartRepository.delete(cart);
        repository.delete(user);
        cloudinaryService.delete(imageCloudId);
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

    @Override
    @Transactional
    public User changeProfilePicture(MultipartFile picture, String userId) throws IOException {
        User user = repository.findById(userId).orElseThrow(()-> new NotfoundException(messages.getUSER_NOT_FOUND_404()));

        try {
            if (picture.isEmpty()) {
                throw new BadRequestException("Empty file.");
            }
            if (user.getProfilePhotoPath()!=null) {
                Image image = imageRepository.findById(user.getImageId()).orElseThrow(()-> new NotfoundException("Image not found."));
                imageRepository.delete(image);
                cloudinaryService.delete(user.getProfilePhotoCloudId());

            }


            Map uploadResult = cloudinaryService.upload(picture);
            Image   smartphoneImage = new Image();
            smartphoneImage.setId(UUID.randomUUID().toString());
            smartphoneImage.setImageUrl((String) uploadResult.get("url"));
            smartphoneImage.setCloudImageId(uploadResult.get("public_id").toString());
            smartphoneImage.setProductType(null);
            smartphoneImage.setName((String) uploadResult.get("original_filename"));
            imageRepository.save(smartphoneImage);
            user.setImageId(smartphoneImage.getId());
            user.setProfilePhotoPath(smartphoneImage.getImageUrl());
            user.setProfilePhotoCloudId(smartphoneImage.getCloudImageId());
            userRepository.save(user);

        } catch (IOException e) {
            //throw new BadRequestException(e.getMessage());
        }
    return user;
    }

    @Override
    public void deleteUserAdress(String userId, String id) {
        User user = userRepository.findById(userId).orElseThrow(()-> new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        Address address = adressRepository.findById(id).orElseThrow(()-> new NotfoundException("Adress not found"));
        if (user.getAddresses().contains(address)) {
            user.getAddresses().remove(address);
            userRepository.save(user);
            adressRepository.delete(address);
        }
        else{
            throw new ForbiddenException("You are now owner for this adress. Please don't try hacking.");
        }
    }
    public Address updateUserAdress(String userId, UpdateAdressRequest r, String addressId){
        User user = userRepository.findById(userId).orElseThrow(()-> new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        Address address = adressRepository.findById(addressId).orElseThrow(()-> new NotfoundException("Adress not found"));
        if (user.getAddresses().contains(address)) {
            address.setTitle(r.getTitle());
            address.setPhoneNumber(r.getPhoneNumber());
            address.setFullAddress(r.getFullAddress());
            adressRepository.save(address);
            return address;


        }
        else{
            throw new ForbiddenException("You are now owner for this adress. Please don't try hacking.");
        }


    }

    public List<UserDTO> getAllUsers(){
        var allusers = repository.findAll();
        return usersToDTOS(allusers);
    }

    @Override
    public Address createAdress(String userId, CreateAdressRequest r) {
        User user = userRepository.findById(userId).orElseThrow(()-> new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        Address address = new Address();
        address.setId(UUID.randomUUID().toString());
        address.setTitle(r.getTitle());
        address.setFullAddress(r.getFullAddress());
        address.setPhoneNumber(r.getPhoneNumber());
        adressRepository.save(address);
        user.getAddresses().add(address);
        userRepository.save(user);
        return address;
    }

    public List<Address> getUserAdresses(String userId) {
        User user = userRepository.findById(userId).orElseThrow(()-> new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        return user.getAddresses();
    }

    public UserDTO userToDTO(User user){
        Cart cart = cartRepository.findById(user.getCartId()).orElseThrow(()-> new NotfoundException("Cart not found."));

        var dto = UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole())
                .cart(cart)
                .profilePhotoPath(user.getProfilePhotoPath())
                .fullName(user.getFullName())
                .build();
        return dto;
    }
    public List<UserDTO> usersToDTOS(List<User> userlist){
        List<UserDTO> response = new ArrayList<>();
        for (User user : userlist){
            response.add(userToDTO(user));
        }
        return response;
    }

}

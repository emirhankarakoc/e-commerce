package com.karakoc.ecommerce.users.repository;

import com.karakoc.ecommerce.users.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,String> {

    Optional<User> findUserByEmail(String email);
}

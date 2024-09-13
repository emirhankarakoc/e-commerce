package com.karakoc.ecommerce;

import com.karakoc.ecommerce.carts.Cart;
import com.karakoc.ecommerce.carts.CartRepository;
import com.karakoc.ecommerce.user.Roles;
import com.karakoc.ecommerce.user.User;
import com.karakoc.ecommerce.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.UUID;

@SpringBootApplication
public class ECommerceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ECommerceApplication.class, args);
	}


}

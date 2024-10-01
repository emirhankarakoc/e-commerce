package com.karakoc.ecommerce.cartitems.repository;

import com.karakoc.ecommerce.cartitems.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem,String> {
}

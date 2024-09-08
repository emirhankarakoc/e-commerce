package com.karakoc.ecommerce.carts;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CartRepository extends JpaRepository<Cart, String> {
    @Query("SELECT c FROM Cart c JOIN c.items i WHERE i.productId = :productId")
    List<Cart> findCartsByProductId(@Param("productId") String productId);


}

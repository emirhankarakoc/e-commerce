package com.karakoc.ecommerce.products.repository;

import com.karakoc.ecommerce.products.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,String> {
}

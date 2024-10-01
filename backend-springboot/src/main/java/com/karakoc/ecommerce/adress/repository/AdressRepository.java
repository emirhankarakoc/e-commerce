package com.karakoc.ecommerce.adress.repository;

import com.karakoc.ecommerce.adress.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdressRepository extends JpaRepository<Address, String> {
}

package com.karakoc.ecommerce.smartphones.repository;

import com.karakoc.ecommerce.smartphones.model.Smartphone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SmartphoneRepository extends JpaRepository<Smartphone,String> {
}

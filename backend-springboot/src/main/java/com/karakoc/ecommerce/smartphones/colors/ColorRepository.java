package com.karakoc.ecommerce.smartphones.colors;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ColorRepository extends JpaRepository<Color,String> {
    List<Color> findAllBySmartphoneId(String smartphoneId);
}

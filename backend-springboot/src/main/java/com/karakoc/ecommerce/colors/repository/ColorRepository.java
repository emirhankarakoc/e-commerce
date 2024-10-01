package com.karakoc.ecommerce.colors.repository;

import com.karakoc.ecommerce.colors.model.Color;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColorRepository extends JpaRepository<Color,String> {
}

package com.karakoc.ecommerce.cloudinary.repository;

import com.karakoc.ecommerce.cloudinary.model.Image;
import com.karakoc.ecommerce.products.model.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image,String> {
    List<Image> findByOrderById();
    List<Image> findAllByProductType(ProductType productType);
}
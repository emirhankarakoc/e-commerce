package com.karakoc.ecommerce.reviews.repository;

import com.karakoc.ecommerce.reviews.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, String> {

    List<Review> findAllBySmartphoneId(String smartphoneId);
}

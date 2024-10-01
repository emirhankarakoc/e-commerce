package com.karakoc.ecommerce.reviews.service;

import com.karakoc.ecommerce.reviews.model.Review;
import com.karakoc.ecommerce.reviews.model.CreateReviewRequest;

import java.util.List;

public interface ReviewService {
    double calculateRating(String smartphoneId);
    Review createReview(String userId, CreateReviewRequest request);

    List<Review> getSmartphoneReviews(String id);
}


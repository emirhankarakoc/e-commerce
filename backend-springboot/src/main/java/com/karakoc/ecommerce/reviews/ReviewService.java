package com.karakoc.ecommerce.reviews;

import com.karakoc.ecommerce.reviews.requests.CreateReviewRequest;
import com.karakoc.ecommerce.security.UserPrincipal;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface ReviewService {
    double calculateRating(String smartphoneId);
    Review createReview( String userId, CreateReviewRequest request);

    List<Review> getSmartphoneReviews(String id);
}


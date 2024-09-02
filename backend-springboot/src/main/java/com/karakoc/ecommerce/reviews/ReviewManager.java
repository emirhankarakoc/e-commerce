package com.karakoc.ecommerce.reviews;


import com.karakoc.ecommerce.exceptions.general.NotfoundException;
import com.karakoc.ecommerce.reviews.requests.CreateReviewRequest;
import com.karakoc.ecommerce.smartphones.Smartphone;
import com.karakoc.ecommerce.smartphones.SmartphoneRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ReviewManager implements ReviewService{
    private final ReviewRepository reviewRepository;
    private final SmartphoneRepository smartphoneRepository;


    @Override
    @Transactional
    public Review createReview(String userId, CreateReviewRequest request) {
        Smartphone smartphone = smartphoneRepository.findById(request.getSmartphoneId()).orElseThrow(()-> new NotfoundException("Smartphone not found"));
        Review review = new Review();
        review.setId(UUID.randomUUID().toString());
        review.setUserId(userId);
        review.setDate(LocalDate.now());
        review.setContent(request.getContent());
        review.setSmartphoneId(request.getSmartphoneId());
        review.setPoint(review.getPoint());
        reviewRepository.save(review);
        smartphone.getReviews().add(review);
        smartphoneRepository.save(smartphone);
        return review;

    }

    public double calculateRating(String smartphoneId){
        Smartphone smartphone = smartphoneRepository.findById(smartphoneId).orElseThrow(()-> new NotfoundException("Smartphone not found"));
        List<Review> reviews = reviewRepository.findAllBySmartphoneId(smartphoneId);
        double toplam = 0;
        for (Review review : reviews) {
            toplam += review.getPoint();
        }
        return toplam/reviews.size();
    }
}

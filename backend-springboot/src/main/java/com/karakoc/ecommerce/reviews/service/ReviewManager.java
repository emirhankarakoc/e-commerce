package com.karakoc.ecommerce.reviews.service;


import com.karakoc.ecommerce.exceptions.general.NotfoundException;
import com.karakoc.ecommerce.reviews.model.Review;
import com.karakoc.ecommerce.reviews.repository.ReviewRepository;
import com.karakoc.ecommerce.reviews.model.CreateReviewRequest;
import com.karakoc.ecommerce.smartphones.model.Smartphone;
import com.karakoc.ecommerce.smartphones.repository.SmartphoneRepository;
import com.karakoc.ecommerce.users.model.User;
import com.karakoc.ecommerce.users.repository.UserRepository;
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
    private final UserRepository userRepository;



    @Override
    @Transactional
    public Review createReview(String userId, CreateReviewRequest request) {
        Smartphone smartphone = smartphoneRepository.findById(request.getSmartphoneId()).orElseThrow(()-> new NotfoundException("Smartphone not found"));
        User user = userRepository.findById(userId).orElseThrow(()-> new NotfoundException("User not found.")) ;
        Review review = new Review();
        review.setId(UUID.randomUUID().toString());
        review.setUserFullname(user.getFullName());
        review.setUserProfilePictureImageUrl(user.getProfilePhotoPath());
        review.setDate(LocalDate.now());
        review.setContent(request.getContent());
        review.setSmartphoneId(request.getSmartphoneId());
        review.setPoint(request.getPoint());
        reviewRepository.save(review);
        smartphone.getReviews().add(review);
        smartphoneRepository.save(smartphone);
        return review;

    }

    @Override
    public List<Review> getSmartphoneReviews(String id) {
        Smartphone smartphone = smartphoneRepository.findById(id).orElseThrow(()-> new NotfoundException("Smartphone not found"));
        return smartphone.getReviews();
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

package com.karakoc.ecommerce.reviews;


import com.karakoc.ecommerce.exceptions.general.BadRequestException;
import com.karakoc.ecommerce.reviews.requests.CreateReviewRequest;
import com.karakoc.ecommerce.security.UserPrincipal;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reviews")
@AllArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping
    public Review postReview(@AuthenticationPrincipal UserPrincipal principal, @RequestBody CreateReviewRequest request) {
        controlReview(request);
        return reviewService.createReview(principal.getUserId(),request);
    }
















    private void controlReview(CreateReviewRequest request){
        if (request.getPoint()>5 || request.getPoint()<1){
            throw new BadRequestException("Review point must be between 1 and 5");
        }
    }
}

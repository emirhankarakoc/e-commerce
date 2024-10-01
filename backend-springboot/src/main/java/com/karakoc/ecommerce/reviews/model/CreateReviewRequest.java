package com.karakoc.ecommerce.reviews.model;

import lombok.Data;

@Data
public class CreateReviewRequest {
    private String smartphoneId;
    private String content;
    private int point;
}

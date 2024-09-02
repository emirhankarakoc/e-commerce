package com.karakoc.ecommerce.reviews.requests;

import jakarta.persistence.Column;
import lombok.Data;

import java.time.LocalDate;
@Data
public class CreateReviewRequest {
    private String smartphoneId;
    private String content;
    private int point;
}

package com.karakoc.ecommerce.reviews;

import com.karakoc.ecommerce.user.User;
import jakarta.persistence.Column;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ReviewResponse {
    private String id;
    private String smartphoneId;
    private User user;

    private String content;

    private int point;
    private LocalDate date;
}

package com.karakoc.ecommerce.reviews.model;

import com.karakoc.ecommerce.users.model.User;
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

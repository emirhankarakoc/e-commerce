package com.karakoc.ecommerce.reviews.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Review {
    @Id
    private String id;
    private String smartphoneId;
    private String userFullname;
    @Column(columnDefinition = "TEXT")
    private String userProfilePictureImageUrl;
    @Column(columnDefinition = "TEXT")
    private String content;

    private int point;
    private LocalDate date;
}

package com.karakoc.ecommerce.smartphones.details;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Details {
    @Id
    private String id;
    @Column(name = "TEXT")
    private String description;

    private String screenDiagonal;
    private String screenResolution;
    private String screenRefreshRate;
    private String pixelDensity;
    private String screenType;
    private String additionaly;

    private String smartphoneId;
}

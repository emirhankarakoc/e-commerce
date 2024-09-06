package com.karakoc.ecommerce.smartphones.details;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.karakoc.ecommerce.smartphones.Smartphone;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class Details {
    @Id
    private String id;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String screenDiagonal;
    private String screenResolution;
    private String screenRefreshRate;
    private String pixelDensity;
    private String screenType;
    private String additionaly;
    private String smartphoneId;
}

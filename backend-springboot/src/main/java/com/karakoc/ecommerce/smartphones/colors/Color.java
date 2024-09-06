package com.karakoc.ecommerce.smartphones.colors;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.karakoc.ecommerce.smartphones.Smartphone;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Color {
    @Id
    private String id;
    private String code;


    private String smartphoneId;
}

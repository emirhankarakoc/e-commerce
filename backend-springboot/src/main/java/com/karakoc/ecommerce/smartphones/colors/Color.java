package com.karakoc.ecommerce.smartphones.colors;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Color {
    @Id
    private String id;
    private String code;
}

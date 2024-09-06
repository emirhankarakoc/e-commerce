package com.karakoc.ecommerce.orders;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Order {
    @Id
    private String id;

    private LocalDateTime date;



}

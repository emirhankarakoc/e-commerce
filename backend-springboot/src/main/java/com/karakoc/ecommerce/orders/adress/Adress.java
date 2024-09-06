package com.karakoc.ecommerce.orders.adress;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Adress {
    @Id
    private String id;
    private String title;
    private String phoneNumber;


    @Column(columnDefinition = "TEXT")
    private String fullAdress;
}

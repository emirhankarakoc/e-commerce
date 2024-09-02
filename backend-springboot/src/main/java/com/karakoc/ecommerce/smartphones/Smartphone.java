package com.karakoc.ecommerce.smartphones;


import com.karakoc.ecommerce.products.Product;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Data;

@Entity
@Data
public class Smartphone extends Product {

    private String screenSize;
    private String cpu;
    private String numberOfCores;
    private String memory;
    private String battery;

    @Column(columnDefinition = "TEXT")
    private String description;



}

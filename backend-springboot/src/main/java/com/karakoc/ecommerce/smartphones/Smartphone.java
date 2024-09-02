package com.karakoc.ecommerce.smartphones;


import com.karakoc.ecommerce.products.Product;
import com.karakoc.ecommerce.smartphones.details.Details;
import jakarta.persistence.*;
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

    @OneToOne
    @JoinColumn(name = "detailId")
    private Details details;


}

package com.karakoc.ecommerce.smartphones.model;

import com.karakoc.ecommerce.products.model.Product;
import com.karakoc.ecommerce.colors.model.Color;
import com.karakoc.ecommerce.details.model.Details;
import com.karakoc.ecommerce.memories.model.Memory;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Smartphone extends Product {

    private String screenSize;
    private String cpu;
    private String numberOfCores;
    private String frontCameraProps;
    private String mainCameraProps;
    private String guaranteeOption;
    private String battery;
    @OneToOne
    @JoinColumn(name = "detailId")
    private Details details;

    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "colorId")
    private List<Color> colors;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "memoryId")
    private List<Memory> memoryOptions;



}

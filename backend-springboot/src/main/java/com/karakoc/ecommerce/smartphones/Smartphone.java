package com.karakoc.ecommerce.smartphones;

import com.karakoc.ecommerce.cloudinary.entity.Image;
import com.karakoc.ecommerce.products.Product;
import com.karakoc.ecommerce.smartphones.colors.Color;
import com.karakoc.ecommerce.smartphones.details.Details;
import com.karakoc.ecommerce.smartphones.memories.Memory;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
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

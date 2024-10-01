package com.karakoc.ecommerce.cloudinary.model;

import com.karakoc.ecommerce.products.model.ProductType;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Image {
    @Id
    private String id;
    private String name;
    @Column(columnDefinition = "TEXT")
    private String imageUrl;
    private String cloudImageId;

    @Enumerated(EnumType.STRING)
    private ProductType productType;


    public Image(String name, String imageUrl, String cloudImageId, ProductType productType) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
        this.imageUrl = imageUrl;
        this.cloudImageId = cloudImageId;
        this.productType = productType;
    }


    public static List<ImageDTO> imagesToDTOS(List<Image> images) {
        List<ImageDTO> dto = new ArrayList<>();
        for (Image image : images) {
            ImageDTO imageDTO = new ImageDTO();
            imageDTO.setImageUrl(image.getImageUrl());
            dto.add(imageDTO);
        }
        return dto;
    }


}

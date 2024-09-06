package com.karakoc.ecommerce.smartphones;

import com.karakoc.ecommerce.cloudinary.entity.Image;
import com.karakoc.ecommerce.cloudinary.entity.ImageDTO;
import com.karakoc.ecommerce.products.Product;
import com.karakoc.ecommerce.smartphones.colors.Color;
import com.karakoc.ecommerce.smartphones.details.Details;
import com.karakoc.ecommerce.smartphones.memories.Memory;
import com.karakoc.ecommerce.smartphones.requests.SmartphoneResponse;
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

    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToMany
    @JoinColumn(name = "colorId")
    private List<Color> colors;

    @OneToMany
    @JoinColumn(name = "memoryId")
    private List<Memory> memoryOptions;

    @OneToOne
    @JoinColumn(name = "detailId")
    private Details details;

    public static SmartphoneResponse smartphoneToResponse(Smartphone smartphone) {
        SmartphoneResponse productResponse = new SmartphoneResponse();
        productResponse.setId(smartphone.getId());
        productResponse.setBrandName(smartphone.getBrandName());
        productResponse.setImages(Image.imagesToDTOS(smartphone.getImages()));
        productResponse.setModelName(smartphone.getModelName());
        productResponse.setPrice(smartphone.getPrice());
        productResponse.setOldPrice(smartphone.getOldPrice());
        productResponse.setScreenSize(smartphone.getScreenSize());
        productResponse.setCpu(smartphone.getCpu());
        productResponse.setNumberOfCores(smartphone.getNumberOfCores());
        productResponse.setBattery(smartphone.getBattery());
        productResponse.setDescription(smartphone.getDescription());
        productResponse.setFrontCameraProps(smartphone.getFrontCameraProps());
        productResponse.setMainCameraProps(smartphone.getMainCameraProps());
        productResponse.setGuaranteeOption(smartphone.getGuaranteeOption());
        productResponse.setColors(smartphone.getColors());
        productResponse.setMemoryOptions(smartphone.getMemoryOptions());
        productResponse.setDetails(smartphone.getDetails());
        return productResponse;
    }

    public static List<SmartphoneResponse> smartphoneResponseList(List<Smartphone> smartphones){
        List<SmartphoneResponse> dtos = new ArrayList<>();
        for (Smartphone smartphone : smartphones) {
            dtos.add(smartphoneToResponse(smartphone));
        }
        return dtos;
    }
}

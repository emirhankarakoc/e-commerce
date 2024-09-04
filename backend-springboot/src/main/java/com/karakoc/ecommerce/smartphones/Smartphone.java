package com.karakoc.ecommerce.smartphones;


import com.karakoc.ecommerce.cloudinary.entity.ImageDTO;
import com.karakoc.ecommerce.products.Product;
import com.karakoc.ecommerce.smartphones.details.Details;
import com.karakoc.ecommerce.smartphones.memories.Memory;
import com.karakoc.ecommerce.smartphones.requests.SmartphoneResponse;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

import static com.karakoc.ecommerce.cloudinary.entity.Image.imagesToDTOS;

@Entity
@Data
public class Smartphone extends Product {

    private String screenSize;
    private String cpu;
    private String numberOfCores;
    private String frontCameraProps;
    private String mainCameraProps;
    private String guaranteeOption;

    @OneToMany
    @JoinColumn(name = "memoryId")
    private List<Memory> memoryOptions;

    private String battery;

    @Column(columnDefinition = "TEXT")
    private String description;


    @OneToOne
    @JoinColumn(name = "detailId")
    private Details details;



    public static SmartphoneResponse smartphoneToResponse(Smartphone smartphone) {
        SmartphoneResponse productResponse = new SmartphoneResponse();
        productResponse.setId(smartphone.getId());
        productResponse.setBrandName(smartphone.getBrandName());
        productResponse.setModelName(smartphone.getModelName());
        productResponse.setPrice(smartphone.getPrice());
        productResponse.setScreenSize(smartphone.getScreenSize());
        productResponse.setPrice(smartphone.getPrice());
        productResponse.setOldPrice(smartphone.getOldPrice());
        productResponse.setColors(smartphone.getColors());
        List<ImageDTO> dto = imagesToDTOS(smartphone.getImages());
        productResponse.setImageLinks(dto);
        productResponse.setDescription(smartphone.getDescription());
        productResponse.setCpu(smartphone.getCpu());
        productResponse.setNumberOfCores(smartphone.getNumberOfCores());
        productResponse.setMemoryOptions(smartphone.getMemoryOptions());
        productResponse.setBattery(smartphone.getBattery());
        productResponse.setReviews(smartphone.getReviews());
        productResponse.setDetails(smartphone.getDetails());
        productResponse.setFrontCameraProps(smartphone.getFrontCameraProps());
        productResponse.setMainCameraProps(smartphone.getMainCameraProps());
        productResponse.setGuaranteeOption(smartphone.getGuaranteeOption());
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

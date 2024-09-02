package com.karakoc.ecommerce.smartphones;


import com.karakoc.ecommerce.cloudinary.entity.Image;
import com.karakoc.ecommerce.cloudinary.entity.ImageDTO;
import com.karakoc.ecommerce.cloudinary.repository.ImageRepository;
import com.karakoc.ecommerce.cloudinary.service.CloudinaryService;
import com.karakoc.ecommerce.exceptions.general.BadRequestException;
import com.karakoc.ecommerce.exceptions.general.NotfoundException;
import com.karakoc.ecommerce.products.ProductType;
import com.karakoc.ecommerce.reviews.ReviewRepository;
import com.karakoc.ecommerce.reviews.ReviewService;
import com.karakoc.ecommerce.smartphones.details.Details;
import com.karakoc.ecommerce.smartphones.details.DetailsRepository;
import com.karakoc.ecommerce.smartphones.requests.CreateSmartphoneRequest;
import com.karakoc.ecommerce.smartphones.requests.SmartphoneResponse;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.aspectj.weaver.AjAttribute;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@AllArgsConstructor
public class SmartphoneManager implements SmartphoneService{
    private final SmartphoneRepository smartphoneRepository;
    private final CloudinaryService cloudinaryService;
    private final ImageRepository imageRepository;
    private final DetailsRepository detailsRepository;
    private final ReviewRepository reviewRepository;
    private final ReviewService reviewService;


    @Override
    @Transactional

    public Smartphone createSmartphone(CreateSmartphoneRequest request) {
        Smartphone smartphone = new Smartphone();
        smartphone.setId(UUID.randomUUID().toString());
        smartphone.setBrandName(request.getBrandName());
        smartphone.setModelName(request.getModelName());
        smartphone.setPrice(request.getPrice());
        smartphone.setScreenSize(request.getScreenSize());
        smartphone.setCpu(request.getCpu());
        smartphone.setMemory(request.getMemory());
        smartphone.setNumberOfCores(request.getNumberOfCores());
        smartphone.setBattery(request.getBattery());
        smartphone.setReviews(new ArrayList<>());
        smartphone.setImages(new ArrayList<>());
        Details details = createDetail(request,smartphone.getId());
        smartphone.setDetails(details);
        List<Image> images = new ArrayList<>();

        for (MultipartFile resim : request.getMultipartFiles()){
            try {
                if (resim.isEmpty()) {
                    throw new BadRequestException("Empty file.");
                }
                // Cloudinary'ye yükle
                Map uploadResult = cloudinaryService.upload(resim);

                Image   smartphoneImage = new Image();
                smartphoneImage.setId(UUID.randomUUID().toString());
                smartphoneImage.setImageUrl((String) uploadResult.get("url"));
                smartphoneImage.setCloudImageId(uploadResult.get("public_id").toString());
                smartphoneImage.setProductType(ProductType.SMARTPHONE);
                smartphoneImage.setName((String) uploadResult.get("original_filename"));
                imageRepository.save(smartphoneImage);
                images.add(smartphoneImage);

            } catch (IOException e) {
                //throw new BadRequestException(e.getMessage());
            }
        }

        for (Image image : images) {
            smartphone.getImages().add(image);
        }

        smartphoneRepository.save(smartphone);
        return smartphone;



    }

    @Override
    public SmartphoneResponse getSmartphone(String id) {
        Smartphone smartphone = smartphoneRepository.findById(id).orElseThrow(()-> new NotfoundException("Smartphone not found."));
        SmartphoneResponse productResponse = new SmartphoneResponse();
        productResponse.setId(smartphone.getId());
        productResponse.setBrandName(smartphone.getBrandName());
        productResponse.setModelName(smartphone.getModelName());
        productResponse.setPrice(smartphone.getPrice());
        productResponse.setScreenSize(smartphone.getScreenSize());
        productResponse.setPrice(smartphone.getPrice());
        List<ImageDTO> dto = imagesToDTOS(smartphone.getImages());
        productResponse.setImageLinks(dto);
        productResponse.setCpu(smartphone.getCpu());
        productResponse.setNumberOfCores(smartphone.getNumberOfCores());
        productResponse.setMemory(smartphone.getMemory());
        productResponse.setBattery(smartphone.getBattery());
        productResponse.setReviews(smartphone.getReviews());
        return productResponse;
    }




private List<ImageDTO> imagesToDTOS(List<Image> images) {
        List<ImageDTO> dto = new ArrayList<>();
        for (Image image : images) {
            ImageDTO imageDTO = new ImageDTO();
            imageDTO.setImageUrl(image.getImageUrl());
            dto.add(imageDTO);
        }
        return dto;
}

private Details createDetail(CreateSmartphoneRequest request,String smartphoneId){
    Details details = new Details();
    details.setId(UUID.randomUUID().toString());
    details.setDescription(request.getDescription());
    details.setScreenDiagonal(request.getScreenDiagonal());
    details.setScreenResolution(request.getScreenResolution());
    details.setScreenRefreshRate(request.getScreenRefreshRate());
    details.setPixelDensity(request.getPixelDensity());
    details.setScreenType(request.getScreenType());
    details.setAdditionaly(request.getAdditionaly());
    details.setSmartphoneId(smartphoneId);
    return detailsRepository.save(details);

}
}

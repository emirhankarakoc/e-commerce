package com.karakoc.ecommerce.smartphones;


import com.karakoc.ecommerce.smartphones.colors.Color;
import com.karakoc.ecommerce.cloudinary.entity.Image;
import com.karakoc.ecommerce.smartphones.colors.ColorRepository;
import com.karakoc.ecommerce.cloudinary.repository.ImageRepository;
import com.karakoc.ecommerce.cloudinary.service.CloudinaryService;
import com.karakoc.ecommerce.exceptions.general.BadRequestException;
import com.karakoc.ecommerce.exceptions.general.NotfoundException;
import com.karakoc.ecommerce.products.ProductType;
import com.karakoc.ecommerce.reviews.ReviewRepository;
import com.karakoc.ecommerce.reviews.ReviewService;
import com.karakoc.ecommerce.smartphones.details.Details;
import com.karakoc.ecommerce.smartphones.details.DetailsRepository;
import com.karakoc.ecommerce.smartphones.memories.Memory;
import com.karakoc.ecommerce.smartphones.memories.MemoryRepository;
import com.karakoc.ecommerce.smartphones.requests.CreateSmartphoneRequest;
import com.karakoc.ecommerce.smartphones.requests.SmartphoneResponse;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static com.karakoc.ecommerce.smartphones.Smartphone.smartphoneResponseList;
import static com.karakoc.ecommerce.smartphones.Smartphone.smartphoneToResponse;

@Service
@AllArgsConstructor
public class SmartphoneManager implements SmartphoneService{
    private final SmartphoneRepository smartphoneRepository;
    private final CloudinaryService cloudinaryService;
    private final ImageRepository imageRepository;
    private final DetailsRepository detailsRepository;
    private final ColorRepository colorRepository;
    private final ReviewRepository reviewRepository;
    private final ReviewService reviewService;
    private final MemoryRepository memoryRepository;


    @Override
    @Transactional
    public Smartphone createSmartphone(CreateSmartphoneRequest request) {
        List<Color> colors = new ArrayList<>();
        List<Memory> memoryOptions = new ArrayList<>();

        for (String colorCode: request.getColorCodes()){
            Color color = new Color();
            color.setCode(colorCode);
            color.setId(UUID.randomUUID().toString());
            colors.add(color);
        }
        colorRepository.saveAll(colors);

        for (String memory: request.getMemoryOptions()){
            Memory memory1 = new Memory();
            memory1.setId(UUID.randomUUID().toString());
            memory1.setValue(memory);
            memoryOptions.add(memory1);
        }
        memoryRepository.saveAll(memoryOptions);


        Smartphone smartphone = new Smartphone();
        smartphone.setColors(colors);
        smartphone.setMemoryOptions(memoryOptions);
        smartphone.setId(UUID.randomUUID().toString());
        smartphone.setBrandName(request.getBrandName());
        smartphone.setModelName(request.getModelName());
        smartphone.setPrice(request.getPrice());
        smartphone.setOldPrice(request.getOldPrice());
        smartphone.setScreenSize(request.getScreenSize());
        smartphone.setCpu(request.getCpu());
        smartphone.setNumberOfCores(request.getNumberOfCores());
        smartphone.setBattery(request.getBattery());
        smartphone.setDescription(request.getDescription());
        smartphone.setFrontCameraProps(request.getFrontCameraProps());
        smartphone.setMainCameraProps(request.getMainCameraProps());
        smartphone.setGuaranteeOption(request.getGuaranteeOption());




        Details details = createDetail(request,smartphone.getId());
        smartphone.setDetails(details);

        smartphone.setReviews(new ArrayList<>());
        smartphone.setImages(new ArrayList<>());
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
      return smartphoneToResponse(smartphone);
    }

    @Override
    public List<SmartphoneResponse> getAllSmartphones() {
        List<Smartphone> smartphones = smartphoneRepository.findAll();
        List<SmartphoneResponse> responseList = smartphoneResponseList(smartphones);
        return responseList;
    }




private Details createDetail(CreateSmartphoneRequest request,String smartphoneId){
    Details details = new Details();
    details.setId(UUID.randomUUID().toString());
    details.setDescriptionDetails(request.getDescriptionDetails());
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

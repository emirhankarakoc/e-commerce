package com.karakoc.ecommerce.smartphones;


import com.karakoc.ecommerce.carts.Cart;
import com.karakoc.ecommerce.carts.CartRepository;
import com.karakoc.ecommerce.carts.item.CartItem;
import com.karakoc.ecommerce.reviews.Review;
import com.karakoc.ecommerce.smartphones.colors.Color;
import com.karakoc.ecommerce.cloudinary.entity.Image;
import com.karakoc.ecommerce.smartphones.colors.ColorRepository;
import com.karakoc.ecommerce.cloudinary.repository.ImageRepository;
import com.karakoc.ecommerce.cloudinary.service.CloudinaryService;
import com.karakoc.ecommerce.exceptions.general.BadRequestException;
import com.karakoc.ecommerce.exceptions.general.NotfoundException;
import com.karakoc.ecommerce.products.ProductType;
import com.karakoc.ecommerce.reviews.ReviewRepository;
import com.karakoc.ecommerce.smartphones.colors.CreateColorRequest;
import com.karakoc.ecommerce.smartphones.details.Details;
import com.karakoc.ecommerce.smartphones.details.DetailsRepository;
import com.karakoc.ecommerce.smartphones.memories.CreateMemoryRequest;
import com.karakoc.ecommerce.smartphones.memories.Memory;
import com.karakoc.ecommerce.smartphones.memories.MemoryRepository;
import com.karakoc.ecommerce.smartphones.requests.CreateSmartphoneRequest;
import com.karakoc.ecommerce.smartphones.requests.UpdateSmartphoneRequest;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
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
    private final ColorRepository colorRepository;
    private final ReviewRepository reviewRepository;

    private final MemoryRepository memoryRepository;
    private final CartRepository cartRepository;

    private List<String> splitDataFromFrontend(String colors){
        colors = colors.substring(1, colors.length()-1);
        String[] colorArray = colors.split(",");
        return List.of(colorArray);
    }
    @Override
    @Transactional
    public Smartphone createSmartphone(CreateSmartphoneRequest request) {
        List<String> colorCodes = splitDataFromFrontend(request.getColorNames());
        List<String> memories = splitDataFromFrontend(request.getMemoryOptions());
        Smartphone smartphone = new Smartphone();
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

        smartphone.setColors(new ArrayList<>());
        smartphone.setMemoryOptions(new ArrayList<>());
        smartphone.setReviews(new ArrayList<>());
        smartphone.setImages(new ArrayList<>());

        for (String colorName: colorCodes){
           Color color = createColor(colorName);
           smartphone.getColors().add(color);
        }


        for (String memoryValues: memories){
            Memory memory = createMemory(memoryValues);
            smartphone.getMemoryOptions().add(memory);
        }

        smartphoneRepository.save(smartphone);






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

        // Smartphone'u kaydet
        smartphoneRepository.save(smartphone);
        return smartphone;

    }

    @Override
    @Transactional
    public String updateSmartphoneBasics(String id, UpdateSmartphoneRequest request) {
        // Akıllı telefonu bul
        Smartphone smartphone = smartphoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Smartphone not found"));
        // Basic alanları güncelle
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

        // Güncellenmiş smartphoneu kaydet
        smartphoneRepository.save(smartphone);

        return "Smartphone updated successfully";
    }

    @Override
    public Smartphone getSmartphone(String id) {
        Smartphone smartphone = smartphoneRepository.findById(id).orElseThrow(()-> new NotfoundException("Smartphone not found."));
        return smartphone;
    }


    public String deleteSmartphone(String id) throws IOException {
        // Ürünü bul
        Smartphone smartphone = smartphoneRepository.findById(id).orElseThrow(() -> new NotfoundException("Smartphone not found."));

        // Ürünü sepetlerde bul
        List<Cart> cartsIncludeThisSmartphone = cartRepository.findCartsByProductId(id);

        // Sepetlerde ürünü kaldır
        for (Cart cart : cartsIncludeThisSmartphone) {
            cart.getItems().removeIf(item -> item.getProductId().equals(id));
            // Sepet güncellemeleri ve özet hesaplamaları
            cart.setSummary(calculateCartSummary(cart.getItems()));
            cartRepository.save(cart);
        }

        // Diğer temizlik işlemleri
        List<Image> images = smartphone.getImages();
        List<Color> colors = smartphone.getColors();
        List<Memory> memoryOptions = smartphone.getMemoryOptions();
        List<Review> reviews = smartphone.getReviews();

        deleteAllImages(images);
        colorRepository.deleteAll(colors);
        memoryRepository.deleteAll(memoryOptions);
        reviewRepository.deleteAll(reviews);

        // Ürünü sil
        smartphoneRepository.delete(smartphone);

        return "Smartphone successfully deleted.";
    }

    private double calculateCartSummary(List<CartItem> items) {
        return items.stream()
                .mapToDouble(item -> Double.parseDouble(item.getProductPrice())) // Convert price string to double
                .sum();
    }


    @Override
    public List<Smartphone> getAllSmartphones() {
        List<Smartphone> smartphones = smartphoneRepository.findAll();
        return smartphones;

    }

    private Color createColor(String colorHexCode) {
        Color color = new Color();
        color.setId(UUID.randomUUID().toString());
        color.setCode(colorHexCode);
        return colorRepository.save(color);
    }

    private Memory createMemory(String  value) {
        Memory memory = new Memory();
        memory.setId(UUID.randomUUID().toString());
        memory.setValue(value);
        return memoryRepository.save(memory);
    }

    private Details createDetail(CreateSmartphoneRequest request, String smartphoneId){
    Details details = new Details();
    details.setId(UUID.randomUUID().toString());
    details.setDescription(request.getDescriptionDetails());
    details.setScreenDiagonal(request.getScreenDiagonal());
    details.setScreenResolution(request.getScreenResolution());
    details.setScreenRefreshRate(request.getScreenRefreshRate());
    details.setPixelDensity(request.getPixelDensity());
    details.setScreenType(request.getScreenType());
    details.setAdditionaly(request.getAdditionaly());
    details.setSmartphoneId(smartphoneId);
    return detailsRepository.save(details);

}

private void deleteAllImages(List<Image> images) throws IOException {
        for (Image image : images){
            cloudinaryService.delete(image.getCloudImageId());
        }
        imageRepository.deleteAll(images);
}
}

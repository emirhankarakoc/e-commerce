package com.karakoc.ecommerce.products;

import com.karakoc.ecommerce.cloudinary.service.CloudinaryService;
import com.karakoc.ecommerce.exceptions.general.BadRequestException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ProductManager implements ProductService{

    private final ProductRepository productRepository;
    private final CloudinaryService cloudinaryService;

    public Product createProduct(CreateProductRequest request) throws IOException {
         Product product = new Product();
        product.setId(UUID.randomUUID().toString());
        product.setBattery(request.getBattery());
        product.setMemory(request.getMemory());
        product.setPrice(request.getPrice());
        product.setRating(request.getRating());
        product.setBrandName(request.getBrandName());
        product.setModelName(request.getModelName());

        try {
            if (request.getMultipartFile().isEmpty()) {
                throw new BadRequestException("Empty file.");
            }
            // Cloudinary'ye yükle
            Map uploadResult = cloudinaryService.upload(request.getMultipartFile());
            String photoPath = (String) uploadResult.get("url"); // Cloudinary'den gelen URL'yi al
            product.setImageUrl(photoPath); // Ürünün fotoğraf yolunu ayarla
        } catch (IOException e) {
            throw new BadRequestException(e.getMessage());
        }
        return productRepository.save(product);
    }

    @Override
    public List<Product> getProducts() {
        return productRepository.findAll();
        //end
    }
}


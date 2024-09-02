package com.karakoc.ecommerce.products;

import com.karakoc.ecommerce.cloudinary.entity.Image;
import com.karakoc.ecommerce.cloudinary.repository.ImageRepository;
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
    private final ImageRepository imageRepository;


    @Override
    public List<Product> getProducts() {
        return productRepository.findAll();
        //end
    }

    public List<Image> getImages(ProductType type) {
        List<Image> images = imageRepository.findAllByProductType(type);
        return images;
    }
}


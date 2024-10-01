package com.karakoc.ecommerce.products.service;

import com.karakoc.ecommerce.cloudinary.model.Image;
import com.karakoc.ecommerce.cloudinary.repository.ImageRepository;
import com.karakoc.ecommerce.cloudinary.service.CloudinaryService;
import com.karakoc.ecommerce.products.repository.ProductRepository;
import com.karakoc.ecommerce.products.model.Product;
import com.karakoc.ecommerce.products.model.ProductType;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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


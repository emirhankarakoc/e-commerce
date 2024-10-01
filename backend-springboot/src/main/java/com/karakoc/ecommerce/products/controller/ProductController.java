package com.karakoc.ecommerce.products.controller;

import com.karakoc.ecommerce.cloudinary.model.Image;
import com.karakoc.ecommerce.products.service.ProductService;
import com.karakoc.ecommerce.products.model.Product;
import com.karakoc.ecommerce.products.model.ProductType;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@AllArgsConstructor
public class ProductController {
    private final ProductService productService;


    @GetMapping
    public List<Product> getProducts() {
        return productService.getProducts();
    }
    @GetMapping("/images/type")
    public List<Image> getImages(@RequestParam ProductType type){
        return productService.getImages(type);
    }

}

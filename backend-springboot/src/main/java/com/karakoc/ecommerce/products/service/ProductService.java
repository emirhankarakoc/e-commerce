package com.karakoc.ecommerce.products.service;

import com.karakoc.ecommerce.cloudinary.model.Image;
import com.karakoc.ecommerce.products.model.Product;
import com.karakoc.ecommerce.products.model.ProductType;

import java.util.List;

public interface ProductService {
    List<Product> getProducts();
    List<Image> getImages(ProductType type);

}

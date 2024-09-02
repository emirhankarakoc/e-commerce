package com.karakoc.ecommerce.products;

import com.karakoc.ecommerce.cloudinary.entity.Image;

import java.io.IOException;
import java.util.List;

public interface ProductService {
    List<Product> getProducts();
    List<Image> getImages(ProductType type);

}

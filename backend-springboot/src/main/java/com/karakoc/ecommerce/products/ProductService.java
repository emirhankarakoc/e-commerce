package com.karakoc.ecommerce.products;

import java.io.IOException;
import java.util.List;

public interface ProductService {
    public Product createProduct(CreateProductRequest request) throws IOException;
    List<Product> getProducts();
}

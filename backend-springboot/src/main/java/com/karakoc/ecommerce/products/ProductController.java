package com.karakoc.ecommerce.products;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/products")
@AllArgsConstructor
public class ProductController {
    private final ProductService productService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Ürün oluştur", description = "Müzayede'ye bağlamak için ürün oluştur.")

    public Product createProduct(@ModelAttribute CreateProductRequest request) throws IOException {
        return productService.createProduct(request);
    }

    @GetMapping
    public List<Product> getProducts() {
        return productService.getProducts();
    }
}

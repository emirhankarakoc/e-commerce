package com.karakoc.ecommerce.smartphones;

import com.karakoc.ecommerce.cloudinary.entity.Image;
import com.karakoc.ecommerce.products.ProductType;
import com.karakoc.ecommerce.smartphones.requests.CreateSmartphoneRequest;
import com.karakoc.ecommerce.smartphones.requests.SmartphoneResponse;
import jakarta.servlet.ServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/smartphones")
@AllArgsConstructor
public class SmartphoneController {
    private final SmartphoneService smartphoneService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Smartphone postSmartphone(@ModelAttribute CreateSmartphoneRequest request){
        return smartphoneService.createSmartphone(request);
    }

    @GetMapping("/{id}")
    public SmartphoneResponse getSmartphoneById(@PathVariable String id){
        return smartphoneService.getSmartphone(id);
    }


}


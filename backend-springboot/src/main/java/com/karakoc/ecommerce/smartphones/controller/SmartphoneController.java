package com.karakoc.ecommerce.smartphones.controller;

import com.karakoc.ecommerce.smartphones.model.Smartphone;
import com.karakoc.ecommerce.smartphones.service.SmartphoneService;
import com.karakoc.ecommerce.smartphones.model.CreateSmartphoneRequest;
import com.karakoc.ecommerce.smartphones.model.UpdateSmartphoneRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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
    public Smartphone getSmartphoneById(@PathVariable String id){
        return smartphoneService.getSmartphone(id);
    }

    @GetMapping
    public List<Smartphone> getAllSmartphones() {
        return smartphoneService.getAllSmartphones();
    }

    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE, value = "/{id}")
    public Smartphone updateSmartphoneById(@PathVariable String id, @ModelAttribute UpdateSmartphoneRequest r) throws IOException {
        return smartphoneService.updateSmartphoneById(id,r);
    }

//    @PostMapping("/colors")
//    public Color postColor(@RequestBody CreateColorRequest r){
//        return smartphoneService.createColor(r);
//    }
//    @PostMapping("/memories")
//    public Memory postMemory(@RequestBody CreateMemoryRequest r){
//        return smartphoneService.createMemory(r);
//    }


}


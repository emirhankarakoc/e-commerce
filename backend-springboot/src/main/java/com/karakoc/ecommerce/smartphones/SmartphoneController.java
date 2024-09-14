package com.karakoc.ecommerce.smartphones;

import com.karakoc.ecommerce.smartphones.colors.Color;
import com.karakoc.ecommerce.smartphones.colors.CreateColorRequest;
import com.karakoc.ecommerce.smartphones.memories.CreateMemoryRequest;
import com.karakoc.ecommerce.smartphones.memories.Memory;
import com.karakoc.ecommerce.smartphones.requests.CreateSmartphoneRequest;
import com.karakoc.ecommerce.smartphones.requests.UpdateSmartphoneRequest;
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


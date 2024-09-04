package com.karakoc.ecommerce.smartphones.memories;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Memory {
    @Id
    private String id;
    private String value;
}

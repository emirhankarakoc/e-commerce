package com.karakoc.ecommerce.smartphones.memories;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.karakoc.ecommerce.smartphones.Smartphone;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Memory {
    @Id
    private String id;
    private String value;
    private String smartphoneId;
}

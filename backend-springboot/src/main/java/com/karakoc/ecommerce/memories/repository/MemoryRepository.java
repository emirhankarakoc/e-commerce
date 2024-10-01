package com.karakoc.ecommerce.memories.repository;

import com.karakoc.ecommerce.memories.model.Memory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemoryRepository extends JpaRepository<Memory, String> {
}

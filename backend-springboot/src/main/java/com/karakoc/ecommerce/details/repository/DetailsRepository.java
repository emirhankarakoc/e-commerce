package com.karakoc.ecommerce.details.repository;

import com.karakoc.ecommerce.details.model.Details;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DetailsRepository extends JpaRepository<Details,String > {
}

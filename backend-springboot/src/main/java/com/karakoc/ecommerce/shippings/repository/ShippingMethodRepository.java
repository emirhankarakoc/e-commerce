package com.karakoc.ecommerce.shippings.repository;

import com.karakoc.ecommerce.shippings.model.ShippingMethod;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShippingMethodRepository extends JpaRepository<ShippingMethod,String>
{
}

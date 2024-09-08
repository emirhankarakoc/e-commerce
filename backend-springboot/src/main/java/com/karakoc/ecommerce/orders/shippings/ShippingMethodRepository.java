package com.karakoc.ecommerce.orders.shippings;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ShippingMethodRepository extends JpaRepository<ShippingMethod,String>
{
}

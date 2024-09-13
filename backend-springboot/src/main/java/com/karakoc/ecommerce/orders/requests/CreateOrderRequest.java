package com.karakoc.ecommerce.orders.requests;

import com.karakoc.ecommerce.products.ProductType;
import lombok.Data;

@Data
public class CreateOrderRequest {
    private String shippingTypeId;
    private String addressId;
}

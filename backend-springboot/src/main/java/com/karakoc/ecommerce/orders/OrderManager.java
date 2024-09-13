package com.karakoc.ecommerce.orders;

import com.karakoc.ecommerce.carts.Cart;
import com.karakoc.ecommerce.carts.item.CartItem;
import com.karakoc.ecommerce.exceptions.general.ForbiddenException;
import com.karakoc.ecommerce.exceptions.general.NotfoundException;
import com.karakoc.ecommerce.orders.requests.CreateOrderRequest;
import com.karakoc.ecommerce.orders.shippings.ShippingMethod;
import com.karakoc.ecommerce.orders.shippings.ShippingMethodRepository;
import com.karakoc.ecommerce.products.Product;
import com.karakoc.ecommerce.products.ProductRepository;
import com.karakoc.ecommerce.products.ProductType;
import com.karakoc.ecommerce.smartphones.Smartphone;
import com.karakoc.ecommerce.smartphones.SmartphoneRepository;
import com.karakoc.ecommerce.user.User;
import com.karakoc.ecommerce.user.UserRepository;
import com.karakoc.ecommerce.user.adress.Address;
import com.karakoc.ecommerce.user.adress.AdressRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class OrderManager implements OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ShippingMethodRepository shippingMethodRepository;
    private final AdressRepository adressRepository;
    private final ProductRepository productRepository;
    private final SmartphoneRepository smartphoneRepository;

    @Override
    public Order createOrder(String userId,CreateOrderRequest r) {
        User user = userRepository.findById(userId).orElseThrow(()-> new NotfoundException("User not found"));
        Address address = adressRepository.findById(r.getAddressId()).orElseThrow(()-> new NotfoundException("Address not found"));
        if (!user.getAddresses().contains(address)){
            throw new ForbiddenException("You are not this address owner.");
        }

        Order order = new Order();
        ShippingMethod method = shippingMethodRepository.findById(r.getShippingTypeId()).orElseThrow(()-> new NotfoundException("Shipping type not found"));
        order.setId(UUID.randomUUID().toString());
        order.setUserId(user.getId());
        order.setShippingTypeId(method.getId());
        order.setAddressId(address.getId());
        order.setCardOwnerName("");

        Double tax = 20.0;
        Double cost = user.getCart().getSummary();
        double summary = cost+tax;
        order.setSubtotal("$"+summary );
        order.setDate(LocalDateTime.now());
        return orderRepository.save(order);

    }

    public void clearCartAfterOrder(String userid){
        User user = userRepository.findById(userid).orElseThrow(()-> new NotfoundException("User not found"));
        Cart userCart = user.getCart();


    }
}

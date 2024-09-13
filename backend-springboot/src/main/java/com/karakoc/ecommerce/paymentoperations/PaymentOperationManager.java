package com.karakoc.ecommerce.paymentoperations;

import com.karakoc.ecommerce.carts.Cart;
import com.karakoc.ecommerce.carts.CartRepository;
import com.karakoc.ecommerce.exceptions.general.ForbiddenException;
import com.karakoc.ecommerce.exceptions.general.NotfoundException;
import com.karakoc.ecommerce.paymentoperations.requests.CreatePaymentOperationRequest;
import com.karakoc.ecommerce.paymentoperations.requests.PaymentOperationResponse;
import com.karakoc.ecommerce.paymentoperations.shippings.ShippingMethod;
import com.karakoc.ecommerce.paymentoperations.shippings.ShippingMethodRepository;
import com.karakoc.ecommerce.user.User;
import com.karakoc.ecommerce.user.UserRepository;
import com.karakoc.ecommerce.user.adress.Address;
import com.karakoc.ecommerce.user.adress.AdressRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Service
@AllArgsConstructor
@Slf4j
public class PaymentOperationManager implements PaymentOperationService {
    private final PaymentOperationRepository paymentOperationRepository;
    private final UserRepository userRepository;
    private final ShippingMethodRepository shippingMethodRepository;
    private final AdressRepository addressRepository;
    private final CartRepository cartRepository;

    @Transactional
    public void checkout(String userId, CreatePaymentOperationRequest r){
        createOrder(userId,r);
        clearCartAfterOrder(userId);
    }


    @Override
    public PaymentOperationResponse getOrder(String userId,String orderId) {

        PaymentOperation order = paymentOperationRepository.findById(orderId).orElseThrow(()->new NotfoundException("Order not found."));
        if (!userId.equals(order.getUserId())){
            throw new ForbiddenException("Forbidden.");
        }
        Cart cart = cartRepository.findById(order.getCartId()).orElseThrow(()-> new NotfoundException("Cart not found."));
        return map(order,cart);
    }

    public PaymentOperation createOrder(String userId, CreatePaymentOperationRequest r) {
        User user = userRepository.findById(userId).orElseThrow(()-> new NotfoundException("User not found"));
        Address address = addressRepository.findById(r.getAddressId()).orElseThrow(()-> new NotfoundException("Address not found"));
        if (!user.getAddresses().contains(address)){
            throw new ForbiddenException("You are not this address owner.");
        }


        PaymentOperation paymentOperation = new PaymentOperation();
        ShippingMethod method = shippingMethodRepository.findById(r.getShippingTypeId()).orElseThrow(()-> new NotfoundException("Shipping type not found"));
        paymentOperation.setId(UUID.randomUUID().toString());
        paymentOperation.setUserId(user.getId());
        paymentOperation.setShippingTypeId(method.getId());
        paymentOperation.setAddressId(address.getId());
        paymentOperation.setStatus(Status.PREPARING);
        paymentOperation.setCartId(user.getCartId());
        //credit cards information
        paymentOperation.setCardOwnerName(r.getCardOwnerName());
        paymentOperation.setCardNumber(r.getCardNumber());
        paymentOperation.setExpiration(r.getExpiration());
        paymentOperation.setCvv(r.getCvv());
        //credit cards information end
            Double tax = 20.0;
        Double shippingCost = method.getCost();
        Cart cart = cartRepository.findById(user.getCartId()).orElseThrow(()->new NotfoundException("Cart not found."));
        Double cost = cart.getSummary();
        double summary = cost+tax+shippingCost;
        paymentOperation.setSubtotal("$"+summary);
        paymentOperation.setDate(LocalDateTime.now());

        log.info("New order !");
        return paymentOperationRepository.save(paymentOperation);

    }

    public void clearCartAfterOrder(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NotfoundException("User not found"));

        // Create and save the new Cart
        Cart cart = new Cart();
        cart.setId(UUID.randomUUID().toString());
        cart.setSummary(0);
        cart.setItems(new ArrayList<>());
        cartRepository.save(cart);

        // Update the User with the new Cart
        user.setCartId(cart.getId());
        userRepository.save(user);

        log.info("Cart cleared and updated for user: " + userId);
    }

    @Override
    public List<PaymentOperationResponse> getAllMyOrders(String userId) {
            User user = userRepository.findById(userId)
                    .orElseThrow(()-> new NotfoundException("User not found."));
         return mapList(paymentOperationRepository.findAllByUserId(userId));
    }
    public  List<PaymentOperationResponse> mapList(List<PaymentOperation> r){

         List<PaymentOperationResponse> response = new ArrayList<>();
        for (PaymentOperation order : r){
            Cart cart = cartRepository.findById(order.getCartId()).orElseThrow(()-> new NotfoundException("Cart not found."));

            response.add(map(order,cart));
        }
        return response;
    }
    public PaymentOperationResponse map(PaymentOperation o, Cart cart){

        ShippingMethod sh = shippingMethodRepository.findById(o.getShippingTypeId()).orElseThrow(()-> new NotfoundException("Shipping method not found."));
        Address as = addressRepository.findById(o.getAddressId()).orElseThrow(()-> new NotfoundException("Address not found."));
        PaymentOperationResponse r = new PaymentOperationResponse();
        r.setId(o.getId());
        r.setUserId(o.getUserId());
        r.setSmartphones(cart.getItems());
        r.setShippingType(sh.getName());
        r.setAdress(as.getTitle());
        r.setCardOwnerName(o.getCardOwnerName());
        r.setSubtotal(o.getSubtotal());
        r.setDate(o.getDate());
        r.setStatus(o.getStatus());
        // Check if cardNumber is not null before processing
        if (o.getCardNumber() != null && o.getCardNumber().length() >= 12) {
            r.setCardNumber(o.getCardNumber().substring(0, 4) + " **** **** " + o.getCardNumber().substring(15));
        } else {
            // Handle the case when cardNumber is null or shorter than expected
            r.setCardNumber("**** **** **** ****"); // Display masked value or handle as needed
        }
        return r;
    }

}

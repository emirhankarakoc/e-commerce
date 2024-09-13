package com.karakoc.ecommerce.paymentoperations;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentOperationRepository extends JpaRepository<PaymentOperation,String> {
    List<PaymentOperation> findAllByUserId(String userId);
}

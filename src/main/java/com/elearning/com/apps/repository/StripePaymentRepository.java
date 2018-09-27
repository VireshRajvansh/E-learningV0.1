package com.elearning.com.apps.repository;

import com.elearning.com.apps.domain.StripePayment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the StripePayment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StripePaymentRepository extends JpaRepository<StripePayment, Long> {

}

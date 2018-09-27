package com.elearning.com.apps.repository;

import com.elearning.com.apps.domain.StripeCustomer;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the StripeCustomer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StripeCustomerRepository extends JpaRepository<StripeCustomer, Long> {

}

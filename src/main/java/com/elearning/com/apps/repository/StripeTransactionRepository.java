package com.elearning.com.apps.repository;

import com.elearning.com.apps.domain.StripeTransaction;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the StripeTransaction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StripeTransactionRepository extends JpaRepository<StripeTransaction, Long> {

}

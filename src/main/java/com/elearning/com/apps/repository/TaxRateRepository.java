package com.elearning.com.apps.repository;

import com.elearning.com.apps.domain.TaxRate;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TaxRate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaxRateRepository extends JpaRepository<TaxRate, Long> {

}

package com.elearning.com.apps.repository;

import com.elearning.com.apps.domain.UserSignUpByReferralCode;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UserSignUpByReferralCode entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserSignUpByReferralCodeRepository extends JpaRepository<UserSignUpByReferralCode, Long> {

}

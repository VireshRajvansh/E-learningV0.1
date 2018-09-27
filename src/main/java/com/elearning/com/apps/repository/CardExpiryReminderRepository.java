package com.elearning.com.apps.repository;

import com.elearning.com.apps.domain.CardExpiryReminder;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CardExpiryReminder entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CardExpiryReminderRepository extends JpaRepository<CardExpiryReminder, Long> {

}

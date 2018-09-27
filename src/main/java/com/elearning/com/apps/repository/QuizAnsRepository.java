package com.elearning.com.apps.repository;

import com.elearning.com.apps.domain.QuizAns;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QuizAns entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuizAnsRepository extends JpaRepository<QuizAns, Long> {

}

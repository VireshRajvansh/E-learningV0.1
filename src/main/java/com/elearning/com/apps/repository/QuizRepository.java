package com.elearning.com.apps.repository;

import com.elearning.com.apps.domain.Quiz;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Quiz entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {

    @Query("select quiz from Quiz quiz where quiz.user.login = ?#{principal.username}")
    List<Quiz> findByUserIsCurrentUser();

}

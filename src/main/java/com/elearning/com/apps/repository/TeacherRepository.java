package com.elearning.com.apps.repository;

import com.elearning.com.apps.domain.Teacher;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Teacher entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {

    @Query("select teacher from Teacher teacher where teacher.user.login = ?#{principal.username}")
    List<Teacher> findByUserIsCurrentUser();

}

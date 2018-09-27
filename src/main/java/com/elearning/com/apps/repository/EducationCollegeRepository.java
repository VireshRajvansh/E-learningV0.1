package com.elearning.com.apps.repository;

import com.elearning.com.apps.domain.EducationCollege;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EducationCollege entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EducationCollegeRepository extends JpaRepository<EducationCollege, Long> {

}

package com.elearning.com.apps.repository;

import com.elearning.com.apps.domain.GalleryGroup;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GalleryGroup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GalleryGroupRepository extends JpaRepository<GalleryGroup, Long> {

}

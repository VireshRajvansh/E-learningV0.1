package com.elearning.com.apps.repository;

import com.elearning.com.apps.domain.PlayList;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PlayList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlayListRepository extends JpaRepository<PlayList, Long> {

}

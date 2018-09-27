package com.elearning.com.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearning.com.apps.domain.EducationCollege;
import com.elearning.com.apps.repository.EducationCollegeRepository;
import com.elearning.com.apps.web.rest.errors.BadRequestAlertException;
import com.elearning.com.apps.web.rest.util.HeaderUtil;
import com.elearning.com.apps.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing EducationCollege.
 */
@RestController
@RequestMapping("/api")
public class EducationCollegeResource {

    private final Logger log = LoggerFactory.getLogger(EducationCollegeResource.class);

    private static final String ENTITY_NAME = "educationCollege";

    private final EducationCollegeRepository educationCollegeRepository;

    public EducationCollegeResource(EducationCollegeRepository educationCollegeRepository) {
        this.educationCollegeRepository = educationCollegeRepository;
    }

    /**
     * POST  /education-colleges : Create a new educationCollege.
     *
     * @param educationCollege the educationCollege to create
     * @return the ResponseEntity with status 201 (Created) and with body the new educationCollege, or with status 400 (Bad Request) if the educationCollege has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/education-colleges")
    @Timed
    public ResponseEntity<EducationCollege> createEducationCollege(@Valid @RequestBody EducationCollege educationCollege) throws URISyntaxException {
        log.debug("REST request to save EducationCollege : {}", educationCollege);
        if (educationCollege.getId() != null) {
            throw new BadRequestAlertException("A new educationCollege cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EducationCollege result = educationCollegeRepository.save(educationCollege);
        return ResponseEntity.created(new URI("/api/education-colleges/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /education-colleges : Updates an existing educationCollege.
     *
     * @param educationCollege the educationCollege to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated educationCollege,
     * or with status 400 (Bad Request) if the educationCollege is not valid,
     * or with status 500 (Internal Server Error) if the educationCollege couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/education-colleges")
    @Timed
    public ResponseEntity<EducationCollege> updateEducationCollege(@Valid @RequestBody EducationCollege educationCollege) throws URISyntaxException {
        log.debug("REST request to update EducationCollege : {}", educationCollege);
        if (educationCollege.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EducationCollege result = educationCollegeRepository.save(educationCollege);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, educationCollege.getId().toString()))
            .body(result);
    }

    /**
     * GET  /education-colleges : get all the educationColleges.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of educationColleges in body
     */
    @GetMapping("/education-colleges")
    @Timed
    public ResponseEntity<List<EducationCollege>> getAllEducationColleges(Pageable pageable) {
        log.debug("REST request to get a page of EducationColleges");
        Page<EducationCollege> page = educationCollegeRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/education-colleges");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /education-colleges/:id : get the "id" educationCollege.
     *
     * @param id the id of the educationCollege to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the educationCollege, or with status 404 (Not Found)
     */
    @GetMapping("/education-colleges/{id}")
    @Timed
    public ResponseEntity<EducationCollege> getEducationCollege(@PathVariable Long id) {
        log.debug("REST request to get EducationCollege : {}", id);
        Optional<EducationCollege> educationCollege = educationCollegeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(educationCollege);
    }

    /**
     * DELETE  /education-colleges/:id : delete the "id" educationCollege.
     *
     * @param id the id of the educationCollege to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/education-colleges/{id}")
    @Timed
    public ResponseEntity<Void> deleteEducationCollege(@PathVariable Long id) {
        log.debug("REST request to delete EducationCollege : {}", id);

        educationCollegeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

package com.elearning.com.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearning.com.apps.domain.Jobs;
import com.elearning.com.apps.repository.JobsRepository;
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

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Jobs.
 */
@RestController
@RequestMapping("/api")
public class JobsResource {

    private final Logger log = LoggerFactory.getLogger(JobsResource.class);

    private static final String ENTITY_NAME = "jobs";

    private final JobsRepository jobsRepository;

    public JobsResource(JobsRepository jobsRepository) {
        this.jobsRepository = jobsRepository;
    }

    /**
     * POST  /jobs : Create a new jobs.
     *
     * @param jobs the jobs to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jobs, or with status 400 (Bad Request) if the jobs has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/jobs")
    @Timed
    public ResponseEntity<Jobs> createJobs(@RequestBody Jobs jobs) throws URISyntaxException {
        log.debug("REST request to save Jobs : {}", jobs);
        if (jobs.getId() != null) {
            throw new BadRequestAlertException("A new jobs cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Jobs result = jobsRepository.save(jobs);
        return ResponseEntity.created(new URI("/api/jobs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /jobs : Updates an existing jobs.
     *
     * @param jobs the jobs to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jobs,
     * or with status 400 (Bad Request) if the jobs is not valid,
     * or with status 500 (Internal Server Error) if the jobs couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/jobs")
    @Timed
    public ResponseEntity<Jobs> updateJobs(@RequestBody Jobs jobs) throws URISyntaxException {
        log.debug("REST request to update Jobs : {}", jobs);
        if (jobs.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Jobs result = jobsRepository.save(jobs);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, jobs.getId().toString()))
            .body(result);
    }

    /**
     * GET  /jobs : get all the jobs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of jobs in body
     */
    @GetMapping("/jobs")
    @Timed
    public ResponseEntity<List<Jobs>> getAllJobs(Pageable pageable) {
        log.debug("REST request to get a page of Jobs");
        Page<Jobs> page = jobsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/jobs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /jobs/:id : get the "id" jobs.
     *
     * @param id the id of the jobs to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jobs, or with status 404 (Not Found)
     */
    @GetMapping("/jobs/{id}")
    @Timed
    public ResponseEntity<Jobs> getJobs(@PathVariable Long id) {
        log.debug("REST request to get Jobs : {}", id);
        Optional<Jobs> jobs = jobsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(jobs);
    }

    /**
     * DELETE  /jobs/:id : delete the "id" jobs.
     *
     * @param id the id of the jobs to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/jobs/{id}")
    @Timed
    public ResponseEntity<Void> deleteJobs(@PathVariable Long id) {
        log.debug("REST request to delete Jobs : {}", id);

        jobsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

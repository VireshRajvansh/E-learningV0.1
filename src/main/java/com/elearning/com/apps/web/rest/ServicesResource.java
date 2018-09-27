package com.elearning.com.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearning.com.apps.domain.Services;
import com.elearning.com.apps.repository.ServicesRepository;
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
 * REST controller for managing Services.
 */
@RestController
@RequestMapping("/api")
public class ServicesResource {

    private final Logger log = LoggerFactory.getLogger(ServicesResource.class);

    private static final String ENTITY_NAME = "services";

    private final ServicesRepository servicesRepository;

    public ServicesResource(ServicesRepository servicesRepository) {
        this.servicesRepository = servicesRepository;
    }

    /**
     * POST  /services : Create a new services.
     *
     * @param services the services to create
     * @return the ResponseEntity with status 201 (Created) and with body the new services, or with status 400 (Bad Request) if the services has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/services")
    @Timed
    public ResponseEntity<Services> createServices(@Valid @RequestBody Services services) throws URISyntaxException {
        log.debug("REST request to save Services : {}", services);
        if (services.getId() != null) {
            throw new BadRequestAlertException("A new services cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Services result = servicesRepository.save(services);
        return ResponseEntity.created(new URI("/api/services/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /services : Updates an existing services.
     *
     * @param services the services to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated services,
     * or with status 400 (Bad Request) if the services is not valid,
     * or with status 500 (Internal Server Error) if the services couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/services")
    @Timed
    public ResponseEntity<Services> updateServices(@Valid @RequestBody Services services) throws URISyntaxException {
        log.debug("REST request to update Services : {}", services);
        if (services.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Services result = servicesRepository.save(services);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, services.getId().toString()))
            .body(result);
    }

    /**
     * GET  /services : get all the services.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of services in body
     */
    @GetMapping("/services")
    @Timed
    public ResponseEntity<List<Services>> getAllServices(Pageable pageable) {
        log.debug("REST request to get a page of Services");
        Page<Services> page = servicesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/services");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /services/:id : get the "id" services.
     *
     * @param id the id of the services to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the services, or with status 404 (Not Found)
     */
    @GetMapping("/services/{id}")
    @Timed
    public ResponseEntity<Services> getServices(@PathVariable Long id) {
        log.debug("REST request to get Services : {}", id);
        Optional<Services> services = servicesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(services);
    }

    /**
     * DELETE  /services/:id : delete the "id" services.
     *
     * @param id the id of the services to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/services/{id}")
    @Timed
    public ResponseEntity<Void> deleteServices(@PathVariable Long id) {
        log.debug("REST request to delete Services : {}", id);

        servicesRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

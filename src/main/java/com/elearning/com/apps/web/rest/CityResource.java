package com.elearning.com.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearning.com.apps.domain.City;
import com.elearning.com.apps.repository.CityRepository;
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
 * REST controller for managing City.
 */
@RestController
@RequestMapping("/api")
public class CityResource {

    private final Logger log = LoggerFactory.getLogger(CityResource.class);

    private static final String ENTITY_NAME = "city";

    private final CityRepository cityRepository;

    public CityResource(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    /**
     * POST  /cities : Create a new city.
     *
     * @param city the city to create
     * @return the ResponseEntity with status 201 (Created) and with body the new city, or with status 400 (Bad Request) if the city has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cities")
    @Timed
    public ResponseEntity<City> createCity(@Valid @RequestBody City city) throws URISyntaxException {
        log.debug("REST request to save City : {}", city);
        if (city.getId() != null) {
            throw new BadRequestAlertException("A new city cannot already have an ID", ENTITY_NAME, "idexists");
        }
        City result = cityRepository.save(city);
        return ResponseEntity.created(new URI("/api/cities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cities : Updates an existing city.
     *
     * @param city the city to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated city,
     * or with status 400 (Bad Request) if the city is not valid,
     * or with status 500 (Internal Server Error) if the city couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cities")
    @Timed
    public ResponseEntity<City> updateCity(@Valid @RequestBody City city) throws URISyntaxException {
        log.debug("REST request to update City : {}", city);
        if (city.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        City result = cityRepository.save(city);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, city.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cities : get all the cities.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of cities in body
     */
    @GetMapping("/cities")
    @Timed
    public ResponseEntity<List<City>> getAllCities(Pageable pageable) {
        log.debug("REST request to get a page of Cities");
        Page<City> page = cityRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/cities");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /cities/:id : get the "id" city.
     *
     * @param id the id of the city to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the city, or with status 404 (Not Found)
     */
    @GetMapping("/cities/{id}")
    @Timed
    public ResponseEntity<City> getCity(@PathVariable Long id) {
        log.debug("REST request to get City : {}", id);
        Optional<City> city = cityRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(city);
    }

    /**
     * DELETE  /cities/:id : delete the "id" city.
     *
     * @param id the id of the city to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cities/{id}")
    @Timed
    public ResponseEntity<Void> deleteCity(@PathVariable Long id) {
        log.debug("REST request to delete City : {}", id);

        cityRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

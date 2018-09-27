package com.elearning.com.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearning.com.apps.domain.TaxRate;
import com.elearning.com.apps.repository.TaxRateRepository;
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
 * REST controller for managing TaxRate.
 */
@RestController
@RequestMapping("/api")
public class TaxRateResource {

    private final Logger log = LoggerFactory.getLogger(TaxRateResource.class);

    private static final String ENTITY_NAME = "taxRate";

    private final TaxRateRepository taxRateRepository;

    public TaxRateResource(TaxRateRepository taxRateRepository) {
        this.taxRateRepository = taxRateRepository;
    }

    /**
     * POST  /tax-rates : Create a new taxRate.
     *
     * @param taxRate the taxRate to create
     * @return the ResponseEntity with status 201 (Created) and with body the new taxRate, or with status 400 (Bad Request) if the taxRate has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tax-rates")
    @Timed
    public ResponseEntity<TaxRate> createTaxRate(@RequestBody TaxRate taxRate) throws URISyntaxException {
        log.debug("REST request to save TaxRate : {}", taxRate);
        if (taxRate.getId() != null) {
            throw new BadRequestAlertException("A new taxRate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TaxRate result = taxRateRepository.save(taxRate);
        return ResponseEntity.created(new URI("/api/tax-rates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tax-rates : Updates an existing taxRate.
     *
     * @param taxRate the taxRate to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated taxRate,
     * or with status 400 (Bad Request) if the taxRate is not valid,
     * or with status 500 (Internal Server Error) if the taxRate couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tax-rates")
    @Timed
    public ResponseEntity<TaxRate> updateTaxRate(@RequestBody TaxRate taxRate) throws URISyntaxException {
        log.debug("REST request to update TaxRate : {}", taxRate);
        if (taxRate.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TaxRate result = taxRateRepository.save(taxRate);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, taxRate.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tax-rates : get all the taxRates.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of taxRates in body
     */
    @GetMapping("/tax-rates")
    @Timed
    public ResponseEntity<List<TaxRate>> getAllTaxRates(Pageable pageable) {
        log.debug("REST request to get a page of TaxRates");
        Page<TaxRate> page = taxRateRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tax-rates");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /tax-rates/:id : get the "id" taxRate.
     *
     * @param id the id of the taxRate to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the taxRate, or with status 404 (Not Found)
     */
    @GetMapping("/tax-rates/{id}")
    @Timed
    public ResponseEntity<TaxRate> getTaxRate(@PathVariable Long id) {
        log.debug("REST request to get TaxRate : {}", id);
        Optional<TaxRate> taxRate = taxRateRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(taxRate);
    }

    /**
     * DELETE  /tax-rates/:id : delete the "id" taxRate.
     *
     * @param id the id of the taxRate to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tax-rates/{id}")
    @Timed
    public ResponseEntity<Void> deleteTaxRate(@PathVariable Long id) {
        log.debug("REST request to delete TaxRate : {}", id);

        taxRateRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

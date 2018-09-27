package com.elearning.com.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearning.com.apps.domain.StripePayment;
import com.elearning.com.apps.repository.StripePaymentRepository;
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
 * REST controller for managing StripePayment.
 */
@RestController
@RequestMapping("/api")
public class StripePaymentResource {

    private final Logger log = LoggerFactory.getLogger(StripePaymentResource.class);

    private static final String ENTITY_NAME = "stripePayment";

    private final StripePaymentRepository stripePaymentRepository;

    public StripePaymentResource(StripePaymentRepository stripePaymentRepository) {
        this.stripePaymentRepository = stripePaymentRepository;
    }

    /**
     * POST  /stripe-payments : Create a new stripePayment.
     *
     * @param stripePayment the stripePayment to create
     * @return the ResponseEntity with status 201 (Created) and with body the new stripePayment, or with status 400 (Bad Request) if the stripePayment has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/stripe-payments")
    @Timed
    public ResponseEntity<StripePayment> createStripePayment(@Valid @RequestBody StripePayment stripePayment) throws URISyntaxException {
        log.debug("REST request to save StripePayment : {}", stripePayment);
        if (stripePayment.getId() != null) {
            throw new BadRequestAlertException("A new stripePayment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StripePayment result = stripePaymentRepository.save(stripePayment);
        return ResponseEntity.created(new URI("/api/stripe-payments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /stripe-payments : Updates an existing stripePayment.
     *
     * @param stripePayment the stripePayment to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated stripePayment,
     * or with status 400 (Bad Request) if the stripePayment is not valid,
     * or with status 500 (Internal Server Error) if the stripePayment couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/stripe-payments")
    @Timed
    public ResponseEntity<StripePayment> updateStripePayment(@Valid @RequestBody StripePayment stripePayment) throws URISyntaxException {
        log.debug("REST request to update StripePayment : {}", stripePayment);
        if (stripePayment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StripePayment result = stripePaymentRepository.save(stripePayment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, stripePayment.getId().toString()))
            .body(result);
    }

    /**
     * GET  /stripe-payments : get all the stripePayments.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of stripePayments in body
     */
    @GetMapping("/stripe-payments")
    @Timed
    public ResponseEntity<List<StripePayment>> getAllStripePayments(Pageable pageable) {
        log.debug("REST request to get a page of StripePayments");
        Page<StripePayment> page = stripePaymentRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/stripe-payments");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /stripe-payments/:id : get the "id" stripePayment.
     *
     * @param id the id of the stripePayment to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the stripePayment, or with status 404 (Not Found)
     */
    @GetMapping("/stripe-payments/{id}")
    @Timed
    public ResponseEntity<StripePayment> getStripePayment(@PathVariable Long id) {
        log.debug("REST request to get StripePayment : {}", id);
        Optional<StripePayment> stripePayment = stripePaymentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(stripePayment);
    }

    /**
     * DELETE  /stripe-payments/:id : delete the "id" stripePayment.
     *
     * @param id the id of the stripePayment to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/stripe-payments/{id}")
    @Timed
    public ResponseEntity<Void> deleteStripePayment(@PathVariable Long id) {
        log.debug("REST request to delete StripePayment : {}", id);

        stripePaymentRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

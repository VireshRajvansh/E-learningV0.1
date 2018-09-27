package com.elearning.com.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearning.com.apps.domain.StripeCustomer;
import com.elearning.com.apps.repository.StripeCustomerRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing StripeCustomer.
 */
@RestController
@RequestMapping("/api")
public class StripeCustomerResource {

    private final Logger log = LoggerFactory.getLogger(StripeCustomerResource.class);

    private static final String ENTITY_NAME = "stripeCustomer";

    private final StripeCustomerRepository stripeCustomerRepository;

    public StripeCustomerResource(StripeCustomerRepository stripeCustomerRepository) {
        this.stripeCustomerRepository = stripeCustomerRepository;
    }

    /**
     * POST  /stripe-customers : Create a new stripeCustomer.
     *
     * @param stripeCustomer the stripeCustomer to create
     * @return the ResponseEntity with status 201 (Created) and with body the new stripeCustomer, or with status 400 (Bad Request) if the stripeCustomer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/stripe-customers")
    @Timed
    public ResponseEntity<StripeCustomer> createStripeCustomer(@Valid @RequestBody StripeCustomer stripeCustomer) throws URISyntaxException {
        log.debug("REST request to save StripeCustomer : {}", stripeCustomer);
        if (stripeCustomer.getId() != null) {
            throw new BadRequestAlertException("A new stripeCustomer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StripeCustomer result = stripeCustomerRepository.save(stripeCustomer);
        return ResponseEntity.created(new URI("/api/stripe-customers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /stripe-customers : Updates an existing stripeCustomer.
     *
     * @param stripeCustomer the stripeCustomer to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated stripeCustomer,
     * or with status 400 (Bad Request) if the stripeCustomer is not valid,
     * or with status 500 (Internal Server Error) if the stripeCustomer couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/stripe-customers")
    @Timed
    public ResponseEntity<StripeCustomer> updateStripeCustomer(@Valid @RequestBody StripeCustomer stripeCustomer) throws URISyntaxException {
        log.debug("REST request to update StripeCustomer : {}", stripeCustomer);
        if (stripeCustomer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StripeCustomer result = stripeCustomerRepository.save(stripeCustomer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, stripeCustomer.getId().toString()))
            .body(result);
    }

    /**
     * GET  /stripe-customers : get all the stripeCustomers.
     *
     * @param pageable the pagination information
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of stripeCustomers in body
     */
    @GetMapping("/stripe-customers")
    @Timed
    public ResponseEntity<List<StripeCustomer>> getAllStripeCustomers(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("student-is-null".equals(filter)) {
            log.debug("REST request to get all StripeCustomers where student is null");
            return new ResponseEntity<>(StreamSupport
                .stream(stripeCustomerRepository.findAll().spliterator(), false)
                .filter(stripeCustomer -> stripeCustomer.getStudent() == null)
                .collect(Collectors.toList()), HttpStatus.OK);
        }
        if ("teacher-is-null".equals(filter)) {
            log.debug("REST request to get all StripeCustomers where teacher is null");
            return new ResponseEntity<>(StreamSupport
                .stream(stripeCustomerRepository.findAll().spliterator(), false)
                .filter(stripeCustomer -> stripeCustomer.getTeacher() == null)
                .collect(Collectors.toList()), HttpStatus.OK);
        }
        log.debug("REST request to get a page of StripeCustomers");
        Page<StripeCustomer> page = stripeCustomerRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/stripe-customers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /stripe-customers/:id : get the "id" stripeCustomer.
     *
     * @param id the id of the stripeCustomer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the stripeCustomer, or with status 404 (Not Found)
     */
    @GetMapping("/stripe-customers/{id}")
    @Timed
    public ResponseEntity<StripeCustomer> getStripeCustomer(@PathVariable Long id) {
        log.debug("REST request to get StripeCustomer : {}", id);
        Optional<StripeCustomer> stripeCustomer = stripeCustomerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(stripeCustomer);
    }

    /**
     * DELETE  /stripe-customers/:id : delete the "id" stripeCustomer.
     *
     * @param id the id of the stripeCustomer to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/stripe-customers/{id}")
    @Timed
    public ResponseEntity<Void> deleteStripeCustomer(@PathVariable Long id) {
        log.debug("REST request to delete StripeCustomer : {}", id);

        stripeCustomerRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

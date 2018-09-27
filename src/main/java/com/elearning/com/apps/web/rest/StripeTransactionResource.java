package com.elearning.com.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearning.com.apps.domain.StripeTransaction;
import com.elearning.com.apps.repository.StripeTransactionRepository;
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
 * REST controller for managing StripeTransaction.
 */
@RestController
@RequestMapping("/api")
public class StripeTransactionResource {

    private final Logger log = LoggerFactory.getLogger(StripeTransactionResource.class);

    private static final String ENTITY_NAME = "stripeTransaction";

    private final StripeTransactionRepository stripeTransactionRepository;

    public StripeTransactionResource(StripeTransactionRepository stripeTransactionRepository) {
        this.stripeTransactionRepository = stripeTransactionRepository;
    }

    /**
     * POST  /stripe-transactions : Create a new stripeTransaction.
     *
     * @param stripeTransaction the stripeTransaction to create
     * @return the ResponseEntity with status 201 (Created) and with body the new stripeTransaction, or with status 400 (Bad Request) if the stripeTransaction has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/stripe-transactions")
    @Timed
    public ResponseEntity<StripeTransaction> createStripeTransaction(@RequestBody StripeTransaction stripeTransaction) throws URISyntaxException {
        log.debug("REST request to save StripeTransaction : {}", stripeTransaction);
        if (stripeTransaction.getId() != null) {
            throw new BadRequestAlertException("A new stripeTransaction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StripeTransaction result = stripeTransactionRepository.save(stripeTransaction);
        return ResponseEntity.created(new URI("/api/stripe-transactions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /stripe-transactions : Updates an existing stripeTransaction.
     *
     * @param stripeTransaction the stripeTransaction to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated stripeTransaction,
     * or with status 400 (Bad Request) if the stripeTransaction is not valid,
     * or with status 500 (Internal Server Error) if the stripeTransaction couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/stripe-transactions")
    @Timed
    public ResponseEntity<StripeTransaction> updateStripeTransaction(@RequestBody StripeTransaction stripeTransaction) throws URISyntaxException {
        log.debug("REST request to update StripeTransaction : {}", stripeTransaction);
        if (stripeTransaction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StripeTransaction result = stripeTransactionRepository.save(stripeTransaction);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, stripeTransaction.getId().toString()))
            .body(result);
    }

    /**
     * GET  /stripe-transactions : get all the stripeTransactions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of stripeTransactions in body
     */
    @GetMapping("/stripe-transactions")
    @Timed
    public ResponseEntity<List<StripeTransaction>> getAllStripeTransactions(Pageable pageable) {
        log.debug("REST request to get a page of StripeTransactions");
        Page<StripeTransaction> page = stripeTransactionRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/stripe-transactions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /stripe-transactions/:id : get the "id" stripeTransaction.
     *
     * @param id the id of the stripeTransaction to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the stripeTransaction, or with status 404 (Not Found)
     */
    @GetMapping("/stripe-transactions/{id}")
    @Timed
    public ResponseEntity<StripeTransaction> getStripeTransaction(@PathVariable Long id) {
        log.debug("REST request to get StripeTransaction : {}", id);
        Optional<StripeTransaction> stripeTransaction = stripeTransactionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(stripeTransaction);
    }

    /**
     * DELETE  /stripe-transactions/:id : delete the "id" stripeTransaction.
     *
     * @param id the id of the stripeTransaction to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/stripe-transactions/{id}")
    @Timed
    public ResponseEntity<Void> deleteStripeTransaction(@PathVariable Long id) {
        log.debug("REST request to delete StripeTransaction : {}", id);

        stripeTransactionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

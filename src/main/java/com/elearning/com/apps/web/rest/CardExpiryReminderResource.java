package com.elearning.com.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearning.com.apps.domain.CardExpiryReminder;
import com.elearning.com.apps.repository.CardExpiryReminderRepository;
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
 * REST controller for managing CardExpiryReminder.
 */
@RestController
@RequestMapping("/api")
public class CardExpiryReminderResource {

    private final Logger log = LoggerFactory.getLogger(CardExpiryReminderResource.class);

    private static final String ENTITY_NAME = "cardExpiryReminder";

    private final CardExpiryReminderRepository cardExpiryReminderRepository;

    public CardExpiryReminderResource(CardExpiryReminderRepository cardExpiryReminderRepository) {
        this.cardExpiryReminderRepository = cardExpiryReminderRepository;
    }

    /**
     * POST  /card-expiry-reminders : Create a new cardExpiryReminder.
     *
     * @param cardExpiryReminder the cardExpiryReminder to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cardExpiryReminder, or with status 400 (Bad Request) if the cardExpiryReminder has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/card-expiry-reminders")
    @Timed
    public ResponseEntity<CardExpiryReminder> createCardExpiryReminder(@RequestBody CardExpiryReminder cardExpiryReminder) throws URISyntaxException {
        log.debug("REST request to save CardExpiryReminder : {}", cardExpiryReminder);
        if (cardExpiryReminder.getId() != null) {
            throw new BadRequestAlertException("A new cardExpiryReminder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CardExpiryReminder result = cardExpiryReminderRepository.save(cardExpiryReminder);
        return ResponseEntity.created(new URI("/api/card-expiry-reminders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /card-expiry-reminders : Updates an existing cardExpiryReminder.
     *
     * @param cardExpiryReminder the cardExpiryReminder to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cardExpiryReminder,
     * or with status 400 (Bad Request) if the cardExpiryReminder is not valid,
     * or with status 500 (Internal Server Error) if the cardExpiryReminder couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/card-expiry-reminders")
    @Timed
    public ResponseEntity<CardExpiryReminder> updateCardExpiryReminder(@RequestBody CardExpiryReminder cardExpiryReminder) throws URISyntaxException {
        log.debug("REST request to update CardExpiryReminder : {}", cardExpiryReminder);
        if (cardExpiryReminder.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CardExpiryReminder result = cardExpiryReminderRepository.save(cardExpiryReminder);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cardExpiryReminder.getId().toString()))
            .body(result);
    }

    /**
     * GET  /card-expiry-reminders : get all the cardExpiryReminders.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of cardExpiryReminders in body
     */
    @GetMapping("/card-expiry-reminders")
    @Timed
    public ResponseEntity<List<CardExpiryReminder>> getAllCardExpiryReminders(Pageable pageable) {
        log.debug("REST request to get a page of CardExpiryReminders");
        Page<CardExpiryReminder> page = cardExpiryReminderRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/card-expiry-reminders");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /card-expiry-reminders/:id : get the "id" cardExpiryReminder.
     *
     * @param id the id of the cardExpiryReminder to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cardExpiryReminder, or with status 404 (Not Found)
     */
    @GetMapping("/card-expiry-reminders/{id}")
    @Timed
    public ResponseEntity<CardExpiryReminder> getCardExpiryReminder(@PathVariable Long id) {
        log.debug("REST request to get CardExpiryReminder : {}", id);
        Optional<CardExpiryReminder> cardExpiryReminder = cardExpiryReminderRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cardExpiryReminder);
    }

    /**
     * DELETE  /card-expiry-reminders/:id : delete the "id" cardExpiryReminder.
     *
     * @param id the id of the cardExpiryReminder to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/card-expiry-reminders/{id}")
    @Timed
    public ResponseEntity<Void> deleteCardExpiryReminder(@PathVariable Long id) {
        log.debug("REST request to delete CardExpiryReminder : {}", id);

        cardExpiryReminderRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

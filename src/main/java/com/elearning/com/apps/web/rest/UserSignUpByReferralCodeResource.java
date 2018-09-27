package com.elearning.com.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearning.com.apps.domain.UserSignUpByReferralCode;
import com.elearning.com.apps.repository.UserSignUpByReferralCodeRepository;
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
 * REST controller for managing UserSignUpByReferralCode.
 */
@RestController
@RequestMapping("/api")
public class UserSignUpByReferralCodeResource {

    private final Logger log = LoggerFactory.getLogger(UserSignUpByReferralCodeResource.class);

    private static final String ENTITY_NAME = "userSignUpByReferralCode";

    private final UserSignUpByReferralCodeRepository userSignUpByReferralCodeRepository;

    public UserSignUpByReferralCodeResource(UserSignUpByReferralCodeRepository userSignUpByReferralCodeRepository) {
        this.userSignUpByReferralCodeRepository = userSignUpByReferralCodeRepository;
    }

    /**
     * POST  /user-sign-up-by-referral-codes : Create a new userSignUpByReferralCode.
     *
     * @param userSignUpByReferralCode the userSignUpByReferralCode to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userSignUpByReferralCode, or with status 400 (Bad Request) if the userSignUpByReferralCode has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-sign-up-by-referral-codes")
    @Timed
    public ResponseEntity<UserSignUpByReferralCode> createUserSignUpByReferralCode(@RequestBody UserSignUpByReferralCode userSignUpByReferralCode) throws URISyntaxException {
        log.debug("REST request to save UserSignUpByReferralCode : {}", userSignUpByReferralCode);
        if (userSignUpByReferralCode.getId() != null) {
            throw new BadRequestAlertException("A new userSignUpByReferralCode cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserSignUpByReferralCode result = userSignUpByReferralCodeRepository.save(userSignUpByReferralCode);
        return ResponseEntity.created(new URI("/api/user-sign-up-by-referral-codes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-sign-up-by-referral-codes : Updates an existing userSignUpByReferralCode.
     *
     * @param userSignUpByReferralCode the userSignUpByReferralCode to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userSignUpByReferralCode,
     * or with status 400 (Bad Request) if the userSignUpByReferralCode is not valid,
     * or with status 500 (Internal Server Error) if the userSignUpByReferralCode couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-sign-up-by-referral-codes")
    @Timed
    public ResponseEntity<UserSignUpByReferralCode> updateUserSignUpByReferralCode(@RequestBody UserSignUpByReferralCode userSignUpByReferralCode) throws URISyntaxException {
        log.debug("REST request to update UserSignUpByReferralCode : {}", userSignUpByReferralCode);
        if (userSignUpByReferralCode.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserSignUpByReferralCode result = userSignUpByReferralCodeRepository.save(userSignUpByReferralCode);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userSignUpByReferralCode.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-sign-up-by-referral-codes : get all the userSignUpByReferralCodes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of userSignUpByReferralCodes in body
     */
    @GetMapping("/user-sign-up-by-referral-codes")
    @Timed
    public ResponseEntity<List<UserSignUpByReferralCode>> getAllUserSignUpByReferralCodes(Pageable pageable) {
        log.debug("REST request to get a page of UserSignUpByReferralCodes");
        Page<UserSignUpByReferralCode> page = userSignUpByReferralCodeRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/user-sign-up-by-referral-codes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /user-sign-up-by-referral-codes/:id : get the "id" userSignUpByReferralCode.
     *
     * @param id the id of the userSignUpByReferralCode to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userSignUpByReferralCode, or with status 404 (Not Found)
     */
    @GetMapping("/user-sign-up-by-referral-codes/{id}")
    @Timed
    public ResponseEntity<UserSignUpByReferralCode> getUserSignUpByReferralCode(@PathVariable Long id) {
        log.debug("REST request to get UserSignUpByReferralCode : {}", id);
        Optional<UserSignUpByReferralCode> userSignUpByReferralCode = userSignUpByReferralCodeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userSignUpByReferralCode);
    }

    /**
     * DELETE  /user-sign-up-by-referral-codes/:id : delete the "id" userSignUpByReferralCode.
     *
     * @param id the id of the userSignUpByReferralCode to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-sign-up-by-referral-codes/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserSignUpByReferralCode(@PathVariable Long id) {
        log.debug("REST request to delete UserSignUpByReferralCode : {}", id);

        userSignUpByReferralCodeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

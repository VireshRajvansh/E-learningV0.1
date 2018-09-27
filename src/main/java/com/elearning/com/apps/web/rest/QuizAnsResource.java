package com.elearning.com.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearning.com.apps.domain.QuizAns;
import com.elearning.com.apps.repository.QuizAnsRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing QuizAns.
 */
@RestController
@RequestMapping("/api")
public class QuizAnsResource {

    private final Logger log = LoggerFactory.getLogger(QuizAnsResource.class);

    private static final String ENTITY_NAME = "quizAns";

    private final QuizAnsRepository quizAnsRepository;

    public QuizAnsResource(QuizAnsRepository quizAnsRepository) {
        this.quizAnsRepository = quizAnsRepository;
    }

    /**
     * POST  /quiz-ans : Create a new quizAns.
     *
     * @param quizAns the quizAns to create
     * @return the ResponseEntity with status 201 (Created) and with body the new quizAns, or with status 400 (Bad Request) if the quizAns has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/quiz-ans")
    @Timed
    public ResponseEntity<QuizAns> createQuizAns(@RequestBody QuizAns quizAns) throws URISyntaxException {
        log.debug("REST request to save QuizAns : {}", quizAns);
        if (quizAns.getId() != null) {
            throw new BadRequestAlertException("A new quizAns cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QuizAns result = quizAnsRepository.save(quizAns);
        return ResponseEntity.created(new URI("/api/quiz-ans/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /quiz-ans : Updates an existing quizAns.
     *
     * @param quizAns the quizAns to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated quizAns,
     * or with status 400 (Bad Request) if the quizAns is not valid,
     * or with status 500 (Internal Server Error) if the quizAns couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/quiz-ans")
    @Timed
    public ResponseEntity<QuizAns> updateQuizAns(@RequestBody QuizAns quizAns) throws URISyntaxException {
        log.debug("REST request to update QuizAns : {}", quizAns);
        if (quizAns.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QuizAns result = quizAnsRepository.save(quizAns);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, quizAns.getId().toString()))
            .body(result);
    }

    /**
     * GET  /quiz-ans : get all the quizAns.
     *
     * @param pageable the pagination information
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of quizAns in body
     */
    @GetMapping("/quiz-ans")
    @Timed
    public ResponseEntity<List<QuizAns>> getAllQuizAns(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("quiz-is-null".equals(filter)) {
            log.debug("REST request to get all QuizAnss where quiz is null");
            return new ResponseEntity<>(StreamSupport
                .stream(quizAnsRepository.findAll().spliterator(), false)
                .filter(quizAns -> quizAns.getQuiz() == null)
                .collect(Collectors.toList()), HttpStatus.OK);
        }
        log.debug("REST request to get a page of QuizAns");
        Page<QuizAns> page = quizAnsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/quiz-ans");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /quiz-ans/:id : get the "id" quizAns.
     *
     * @param id the id of the quizAns to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the quizAns, or with status 404 (Not Found)
     */
    @GetMapping("/quiz-ans/{id}")
    @Timed
    public ResponseEntity<QuizAns> getQuizAns(@PathVariable Long id) {
        log.debug("REST request to get QuizAns : {}", id);
        Optional<QuizAns> quizAns = quizAnsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(quizAns);
    }

    /**
     * DELETE  /quiz-ans/:id : delete the "id" quizAns.
     *
     * @param id the id of the quizAns to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/quiz-ans/{id}")
    @Timed
    public ResponseEntity<Void> deleteQuizAns(@PathVariable Long id) {
        log.debug("REST request to delete QuizAns : {}", id);

        quizAnsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

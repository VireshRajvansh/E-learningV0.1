package com.elearning.com.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearning.com.apps.domain.PlayList;
import com.elearning.com.apps.repository.PlayListRepository;
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
 * REST controller for managing PlayList.
 */
@RestController
@RequestMapping("/api")
public class PlayListResource {

    private final Logger log = LoggerFactory.getLogger(PlayListResource.class);

    private static final String ENTITY_NAME = "playList";

    private final PlayListRepository playListRepository;

    public PlayListResource(PlayListRepository playListRepository) {
        this.playListRepository = playListRepository;
    }

    /**
     * POST  /play-lists : Create a new playList.
     *
     * @param playList the playList to create
     * @return the ResponseEntity with status 201 (Created) and with body the new playList, or with status 400 (Bad Request) if the playList has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/play-lists")
    @Timed
    public ResponseEntity<PlayList> createPlayList(@Valid @RequestBody PlayList playList) throws URISyntaxException {
        log.debug("REST request to save PlayList : {}", playList);
        if (playList.getId() != null) {
            throw new BadRequestAlertException("A new playList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlayList result = playListRepository.save(playList);
        return ResponseEntity.created(new URI("/api/play-lists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /play-lists : Updates an existing playList.
     *
     * @param playList the playList to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated playList,
     * or with status 400 (Bad Request) if the playList is not valid,
     * or with status 500 (Internal Server Error) if the playList couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/play-lists")
    @Timed
    public ResponseEntity<PlayList> updatePlayList(@Valid @RequestBody PlayList playList) throws URISyntaxException {
        log.debug("REST request to update PlayList : {}", playList);
        if (playList.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PlayList result = playListRepository.save(playList);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, playList.getId().toString()))
            .body(result);
    }

    /**
     * GET  /play-lists : get all the playLists.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of playLists in body
     */
    @GetMapping("/play-lists")
    @Timed
    public ResponseEntity<List<PlayList>> getAllPlayLists(Pageable pageable) {
        log.debug("REST request to get a page of PlayLists");
        Page<PlayList> page = playListRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/play-lists");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /play-lists/:id : get the "id" playList.
     *
     * @param id the id of the playList to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the playList, or with status 404 (Not Found)
     */
    @GetMapping("/play-lists/{id}")
    @Timed
    public ResponseEntity<PlayList> getPlayList(@PathVariable Long id) {
        log.debug("REST request to get PlayList : {}", id);
        Optional<PlayList> playList = playListRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(playList);
    }

    /**
     * DELETE  /play-lists/:id : delete the "id" playList.
     *
     * @param id the id of the playList to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/play-lists/{id}")
    @Timed
    public ResponseEntity<Void> deletePlayList(@PathVariable Long id) {
        log.debug("REST request to delete PlayList : {}", id);

        playListRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

package com.elearning.com.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearning.com.apps.domain.GalleryGroup;
import com.elearning.com.apps.repository.GalleryGroupRepository;
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
 * REST controller for managing GalleryGroup.
 */
@RestController
@RequestMapping("/api")
public class GalleryGroupResource {

    private final Logger log = LoggerFactory.getLogger(GalleryGroupResource.class);

    private static final String ENTITY_NAME = "galleryGroup";

    private final GalleryGroupRepository galleryGroupRepository;

    public GalleryGroupResource(GalleryGroupRepository galleryGroupRepository) {
        this.galleryGroupRepository = galleryGroupRepository;
    }

    /**
     * POST  /gallery-groups : Create a new galleryGroup.
     *
     * @param galleryGroup the galleryGroup to create
     * @return the ResponseEntity with status 201 (Created) and with body the new galleryGroup, or with status 400 (Bad Request) if the galleryGroup has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gallery-groups")
    @Timed
    public ResponseEntity<GalleryGroup> createGalleryGroup(@RequestBody GalleryGroup galleryGroup) throws URISyntaxException {
        log.debug("REST request to save GalleryGroup : {}", galleryGroup);
        if (galleryGroup.getId() != null) {
            throw new BadRequestAlertException("A new galleryGroup cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GalleryGroup result = galleryGroupRepository.save(galleryGroup);
        return ResponseEntity.created(new URI("/api/gallery-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gallery-groups : Updates an existing galleryGroup.
     *
     * @param galleryGroup the galleryGroup to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated galleryGroup,
     * or with status 400 (Bad Request) if the galleryGroup is not valid,
     * or with status 500 (Internal Server Error) if the galleryGroup couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gallery-groups")
    @Timed
    public ResponseEntity<GalleryGroup> updateGalleryGroup(@RequestBody GalleryGroup galleryGroup) throws URISyntaxException {
        log.debug("REST request to update GalleryGroup : {}", galleryGroup);
        if (galleryGroup.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GalleryGroup result = galleryGroupRepository.save(galleryGroup);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, galleryGroup.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gallery-groups : get all the galleryGroups.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of galleryGroups in body
     */
    @GetMapping("/gallery-groups")
    @Timed
    public ResponseEntity<List<GalleryGroup>> getAllGalleryGroups(Pageable pageable) {
        log.debug("REST request to get a page of GalleryGroups");
        Page<GalleryGroup> page = galleryGroupRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/gallery-groups");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /gallery-groups/:id : get the "id" galleryGroup.
     *
     * @param id the id of the galleryGroup to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the galleryGroup, or with status 404 (Not Found)
     */
    @GetMapping("/gallery-groups/{id}")
    @Timed
    public ResponseEntity<GalleryGroup> getGalleryGroup(@PathVariable Long id) {
        log.debug("REST request to get GalleryGroup : {}", id);
        Optional<GalleryGroup> galleryGroup = galleryGroupRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(galleryGroup);
    }

    /**
     * DELETE  /gallery-groups/:id : delete the "id" galleryGroup.
     *
     * @param id the id of the galleryGroup to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gallery-groups/{id}")
    @Timed
    public ResponseEntity<Void> deleteGalleryGroup(@PathVariable Long id) {
        log.debug("REST request to delete GalleryGroup : {}", id);

        galleryGroupRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

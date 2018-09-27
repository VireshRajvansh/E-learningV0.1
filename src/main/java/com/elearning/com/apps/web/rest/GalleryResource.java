package com.elearning.com.apps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elearning.com.apps.domain.Gallery;
import com.elearning.com.apps.repository.GalleryRepository;
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
 * REST controller for managing Gallery.
 */
@RestController
@RequestMapping("/api")
public class GalleryResource {

    private final Logger log = LoggerFactory.getLogger(GalleryResource.class);

    private static final String ENTITY_NAME = "gallery";

    private final GalleryRepository galleryRepository;

    public GalleryResource(GalleryRepository galleryRepository) {
        this.galleryRepository = galleryRepository;
    }

    /**
     * POST  /galleries : Create a new gallery.
     *
     * @param gallery the gallery to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gallery, or with status 400 (Bad Request) if the gallery has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/galleries")
    @Timed
    public ResponseEntity<Gallery> createGallery(@RequestBody Gallery gallery) throws URISyntaxException {
        log.debug("REST request to save Gallery : {}", gallery);
        if (gallery.getId() != null) {
            throw new BadRequestAlertException("A new gallery cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Gallery result = galleryRepository.save(gallery);
        return ResponseEntity.created(new URI("/api/galleries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /galleries : Updates an existing gallery.
     *
     * @param gallery the gallery to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gallery,
     * or with status 400 (Bad Request) if the gallery is not valid,
     * or with status 500 (Internal Server Error) if the gallery couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/galleries")
    @Timed
    public ResponseEntity<Gallery> updateGallery(@RequestBody Gallery gallery) throws URISyntaxException {
        log.debug("REST request to update Gallery : {}", gallery);
        if (gallery.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Gallery result = galleryRepository.save(gallery);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gallery.getId().toString()))
            .body(result);
    }

    /**
     * GET  /galleries : get all the galleries.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of galleries in body
     */
    @GetMapping("/galleries")
    @Timed
    public ResponseEntity<List<Gallery>> getAllGalleries(Pageable pageable) {
        log.debug("REST request to get a page of Galleries");
        Page<Gallery> page = galleryRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/galleries");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /galleries/:id : get the "id" gallery.
     *
     * @param id the id of the gallery to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gallery, or with status 404 (Not Found)
     */
    @GetMapping("/galleries/{id}")
    @Timed
    public ResponseEntity<Gallery> getGallery(@PathVariable Long id) {
        log.debug("REST request to get Gallery : {}", id);
        Optional<Gallery> gallery = galleryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(gallery);
    }

    /**
     * DELETE  /galleries/:id : delete the "id" gallery.
     *
     * @param id the id of the gallery to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/galleries/{id}")
    @Timed
    public ResponseEntity<Void> deleteGallery(@PathVariable Long id) {
        log.debug("REST request to delete Gallery : {}", id);

        galleryRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

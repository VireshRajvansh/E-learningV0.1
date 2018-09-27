package com.elearning.com.apps.web.rest;

import com.elearning.com.apps.ELearningApp;

import com.elearning.com.apps.domain.EducationCollege;
import com.elearning.com.apps.repository.EducationCollegeRepository;
import com.elearning.com.apps.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.elearning.com.apps.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EducationCollegeResource REST controller.
 *
 * @see EducationCollegeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ELearningApp.class)
public class EducationCollegeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private EducationCollegeRepository educationCollegeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEducationCollegeMockMvc;

    private EducationCollege educationCollege;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EducationCollegeResource educationCollegeResource = new EducationCollegeResource(educationCollegeRepository);
        this.restEducationCollegeMockMvc = MockMvcBuilders.standaloneSetup(educationCollegeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EducationCollege createEntity(EntityManager em) {
        EducationCollege educationCollege = new EducationCollege()
            .name(DEFAULT_NAME);
        return educationCollege;
    }

    @Before
    public void initTest() {
        educationCollege = createEntity(em);
    }

    @Test
    @Transactional
    public void createEducationCollege() throws Exception {
        int databaseSizeBeforeCreate = educationCollegeRepository.findAll().size();

        // Create the EducationCollege
        restEducationCollegeMockMvc.perform(post("/api/education-colleges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(educationCollege)))
            .andExpect(status().isCreated());

        // Validate the EducationCollege in the database
        List<EducationCollege> educationCollegeList = educationCollegeRepository.findAll();
        assertThat(educationCollegeList).hasSize(databaseSizeBeforeCreate + 1);
        EducationCollege testEducationCollege = educationCollegeList.get(educationCollegeList.size() - 1);
        assertThat(testEducationCollege.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createEducationCollegeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = educationCollegeRepository.findAll().size();

        // Create the EducationCollege with an existing ID
        educationCollege.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEducationCollegeMockMvc.perform(post("/api/education-colleges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(educationCollege)))
            .andExpect(status().isBadRequest());

        // Validate the EducationCollege in the database
        List<EducationCollege> educationCollegeList = educationCollegeRepository.findAll();
        assertThat(educationCollegeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = educationCollegeRepository.findAll().size();
        // set the field null
        educationCollege.setName(null);

        // Create the EducationCollege, which fails.

        restEducationCollegeMockMvc.perform(post("/api/education-colleges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(educationCollege)))
            .andExpect(status().isBadRequest());

        List<EducationCollege> educationCollegeList = educationCollegeRepository.findAll();
        assertThat(educationCollegeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEducationColleges() throws Exception {
        // Initialize the database
        educationCollegeRepository.saveAndFlush(educationCollege);

        // Get all the educationCollegeList
        restEducationCollegeMockMvc.perform(get("/api/education-colleges?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(educationCollege.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getEducationCollege() throws Exception {
        // Initialize the database
        educationCollegeRepository.saveAndFlush(educationCollege);

        // Get the educationCollege
        restEducationCollegeMockMvc.perform(get("/api/education-colleges/{id}", educationCollege.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(educationCollege.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEducationCollege() throws Exception {
        // Get the educationCollege
        restEducationCollegeMockMvc.perform(get("/api/education-colleges/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEducationCollege() throws Exception {
        // Initialize the database
        educationCollegeRepository.saveAndFlush(educationCollege);

        int databaseSizeBeforeUpdate = educationCollegeRepository.findAll().size();

        // Update the educationCollege
        EducationCollege updatedEducationCollege = educationCollegeRepository.findById(educationCollege.getId()).get();
        // Disconnect from session so that the updates on updatedEducationCollege are not directly saved in db
        em.detach(updatedEducationCollege);
        updatedEducationCollege
            .name(UPDATED_NAME);

        restEducationCollegeMockMvc.perform(put("/api/education-colleges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEducationCollege)))
            .andExpect(status().isOk());

        // Validate the EducationCollege in the database
        List<EducationCollege> educationCollegeList = educationCollegeRepository.findAll();
        assertThat(educationCollegeList).hasSize(databaseSizeBeforeUpdate);
        EducationCollege testEducationCollege = educationCollegeList.get(educationCollegeList.size() - 1);
        assertThat(testEducationCollege.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingEducationCollege() throws Exception {
        int databaseSizeBeforeUpdate = educationCollegeRepository.findAll().size();

        // Create the EducationCollege

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEducationCollegeMockMvc.perform(put("/api/education-colleges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(educationCollege)))
            .andExpect(status().isBadRequest());

        // Validate the EducationCollege in the database
        List<EducationCollege> educationCollegeList = educationCollegeRepository.findAll();
        assertThat(educationCollegeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEducationCollege() throws Exception {
        // Initialize the database
        educationCollegeRepository.saveAndFlush(educationCollege);

        int databaseSizeBeforeDelete = educationCollegeRepository.findAll().size();

        // Get the educationCollege
        restEducationCollegeMockMvc.perform(delete("/api/education-colleges/{id}", educationCollege.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EducationCollege> educationCollegeList = educationCollegeRepository.findAll();
        assertThat(educationCollegeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EducationCollege.class);
        EducationCollege educationCollege1 = new EducationCollege();
        educationCollege1.setId(1L);
        EducationCollege educationCollege2 = new EducationCollege();
        educationCollege2.setId(educationCollege1.getId());
        assertThat(educationCollege1).isEqualTo(educationCollege2);
        educationCollege2.setId(2L);
        assertThat(educationCollege1).isNotEqualTo(educationCollege2);
        educationCollege1.setId(null);
        assertThat(educationCollege1).isNotEqualTo(educationCollege2);
    }
}

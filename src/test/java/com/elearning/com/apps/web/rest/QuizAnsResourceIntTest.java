package com.elearning.com.apps.web.rest;

import com.elearning.com.apps.ELearningApp;

import com.elearning.com.apps.domain.QuizAns;
import com.elearning.com.apps.repository.QuizAnsRepository;
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
 * Test class for the QuizAnsResource REST controller.
 *
 * @see QuizAnsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ELearningApp.class)
public class QuizAnsResourceIntTest {

    private static final String DEFAULT_ANSWERS = "AAAAAAAAAA";
    private static final String UPDATED_ANSWERS = "BBBBBBBBBB";

    @Autowired
    private QuizAnsRepository quizAnsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restQuizAnsMockMvc;

    private QuizAns quizAns;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final QuizAnsResource quizAnsResource = new QuizAnsResource(quizAnsRepository);
        this.restQuizAnsMockMvc = MockMvcBuilders.standaloneSetup(quizAnsResource)
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
    public static QuizAns createEntity(EntityManager em) {
        QuizAns quizAns = new QuizAns()
            .answers(DEFAULT_ANSWERS);
        return quizAns;
    }

    @Before
    public void initTest() {
        quizAns = createEntity(em);
    }

    @Test
    @Transactional
    public void createQuizAns() throws Exception {
        int databaseSizeBeforeCreate = quizAnsRepository.findAll().size();

        // Create the QuizAns
        restQuizAnsMockMvc.perform(post("/api/quiz-ans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(quizAns)))
            .andExpect(status().isCreated());

        // Validate the QuizAns in the database
        List<QuizAns> quizAnsList = quizAnsRepository.findAll();
        assertThat(quizAnsList).hasSize(databaseSizeBeforeCreate + 1);
        QuizAns testQuizAns = quizAnsList.get(quizAnsList.size() - 1);
        assertThat(testQuizAns.getAnswers()).isEqualTo(DEFAULT_ANSWERS);
    }

    @Test
    @Transactional
    public void createQuizAnsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = quizAnsRepository.findAll().size();

        // Create the QuizAns with an existing ID
        quizAns.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuizAnsMockMvc.perform(post("/api/quiz-ans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(quizAns)))
            .andExpect(status().isBadRequest());

        // Validate the QuizAns in the database
        List<QuizAns> quizAnsList = quizAnsRepository.findAll();
        assertThat(quizAnsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllQuizAns() throws Exception {
        // Initialize the database
        quizAnsRepository.saveAndFlush(quizAns);

        // Get all the quizAnsList
        restQuizAnsMockMvc.perform(get("/api/quiz-ans?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(quizAns.getId().intValue())))
            .andExpect(jsonPath("$.[*].answers").value(hasItem(DEFAULT_ANSWERS.toString())));
    }
    
    @Test
    @Transactional
    public void getQuizAns() throws Exception {
        // Initialize the database
        quizAnsRepository.saveAndFlush(quizAns);

        // Get the quizAns
        restQuizAnsMockMvc.perform(get("/api/quiz-ans/{id}", quizAns.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(quizAns.getId().intValue()))
            .andExpect(jsonPath("$.answers").value(DEFAULT_ANSWERS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingQuizAns() throws Exception {
        // Get the quizAns
        restQuizAnsMockMvc.perform(get("/api/quiz-ans/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateQuizAns() throws Exception {
        // Initialize the database
        quizAnsRepository.saveAndFlush(quizAns);

        int databaseSizeBeforeUpdate = quizAnsRepository.findAll().size();

        // Update the quizAns
        QuizAns updatedQuizAns = quizAnsRepository.findById(quizAns.getId()).get();
        // Disconnect from session so that the updates on updatedQuizAns are not directly saved in db
        em.detach(updatedQuizAns);
        updatedQuizAns
            .answers(UPDATED_ANSWERS);

        restQuizAnsMockMvc.perform(put("/api/quiz-ans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedQuizAns)))
            .andExpect(status().isOk());

        // Validate the QuizAns in the database
        List<QuizAns> quizAnsList = quizAnsRepository.findAll();
        assertThat(quizAnsList).hasSize(databaseSizeBeforeUpdate);
        QuizAns testQuizAns = quizAnsList.get(quizAnsList.size() - 1);
        assertThat(testQuizAns.getAnswers()).isEqualTo(UPDATED_ANSWERS);
    }

    @Test
    @Transactional
    public void updateNonExistingQuizAns() throws Exception {
        int databaseSizeBeforeUpdate = quizAnsRepository.findAll().size();

        // Create the QuizAns

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuizAnsMockMvc.perform(put("/api/quiz-ans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(quizAns)))
            .andExpect(status().isBadRequest());

        // Validate the QuizAns in the database
        List<QuizAns> quizAnsList = quizAnsRepository.findAll();
        assertThat(quizAnsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteQuizAns() throws Exception {
        // Initialize the database
        quizAnsRepository.saveAndFlush(quizAns);

        int databaseSizeBeforeDelete = quizAnsRepository.findAll().size();

        // Get the quizAns
        restQuizAnsMockMvc.perform(delete("/api/quiz-ans/{id}", quizAns.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<QuizAns> quizAnsList = quizAnsRepository.findAll();
        assertThat(quizAnsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(QuizAns.class);
        QuizAns quizAns1 = new QuizAns();
        quizAns1.setId(1L);
        QuizAns quizAns2 = new QuizAns();
        quizAns2.setId(quizAns1.getId());
        assertThat(quizAns1).isEqualTo(quizAns2);
        quizAns2.setId(2L);
        assertThat(quizAns1).isNotEqualTo(quizAns2);
        quizAns1.setId(null);
        assertThat(quizAns1).isNotEqualTo(quizAns2);
    }
}

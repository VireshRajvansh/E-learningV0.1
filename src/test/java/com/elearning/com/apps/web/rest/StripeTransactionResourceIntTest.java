package com.elearning.com.apps.web.rest;

import com.elearning.com.apps.ELearningApp;

import com.elearning.com.apps.domain.StripeTransaction;
import com.elearning.com.apps.repository.StripeTransactionRepository;
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
 * Test class for the StripeTransactionResource REST controller.
 *
 * @see StripeTransactionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ELearningApp.class)
public class StripeTransactionResourceIntTest {

    private static final String DEFAULT_STRIP_RESPONSE = "AAAAAAAAAA";
    private static final String UPDATED_STRIP_RESPONSE = "BBBBBBBBBB";

    @Autowired
    private StripeTransactionRepository stripeTransactionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restStripeTransactionMockMvc;

    private StripeTransaction stripeTransaction;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StripeTransactionResource stripeTransactionResource = new StripeTransactionResource(stripeTransactionRepository);
        this.restStripeTransactionMockMvc = MockMvcBuilders.standaloneSetup(stripeTransactionResource)
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
    public static StripeTransaction createEntity(EntityManager em) {
        StripeTransaction stripeTransaction = new StripeTransaction()
            .stripResponse(DEFAULT_STRIP_RESPONSE);
        return stripeTransaction;
    }

    @Before
    public void initTest() {
        stripeTransaction = createEntity(em);
    }

    @Test
    @Transactional
    public void createStripeTransaction() throws Exception {
        int databaseSizeBeforeCreate = stripeTransactionRepository.findAll().size();

        // Create the StripeTransaction
        restStripeTransactionMockMvc.perform(post("/api/stripe-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stripeTransaction)))
            .andExpect(status().isCreated());

        // Validate the StripeTransaction in the database
        List<StripeTransaction> stripeTransactionList = stripeTransactionRepository.findAll();
        assertThat(stripeTransactionList).hasSize(databaseSizeBeforeCreate + 1);
        StripeTransaction testStripeTransaction = stripeTransactionList.get(stripeTransactionList.size() - 1);
        assertThat(testStripeTransaction.getStripResponse()).isEqualTo(DEFAULT_STRIP_RESPONSE);
    }

    @Test
    @Transactional
    public void createStripeTransactionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = stripeTransactionRepository.findAll().size();

        // Create the StripeTransaction with an existing ID
        stripeTransaction.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStripeTransactionMockMvc.perform(post("/api/stripe-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stripeTransaction)))
            .andExpect(status().isBadRequest());

        // Validate the StripeTransaction in the database
        List<StripeTransaction> stripeTransactionList = stripeTransactionRepository.findAll();
        assertThat(stripeTransactionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllStripeTransactions() throws Exception {
        // Initialize the database
        stripeTransactionRepository.saveAndFlush(stripeTransaction);

        // Get all the stripeTransactionList
        restStripeTransactionMockMvc.perform(get("/api/stripe-transactions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stripeTransaction.getId().intValue())))
            .andExpect(jsonPath("$.[*].stripResponse").value(hasItem(DEFAULT_STRIP_RESPONSE.toString())));
    }
    
    @Test
    @Transactional
    public void getStripeTransaction() throws Exception {
        // Initialize the database
        stripeTransactionRepository.saveAndFlush(stripeTransaction);

        // Get the stripeTransaction
        restStripeTransactionMockMvc.perform(get("/api/stripe-transactions/{id}", stripeTransaction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(stripeTransaction.getId().intValue()))
            .andExpect(jsonPath("$.stripResponse").value(DEFAULT_STRIP_RESPONSE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStripeTransaction() throws Exception {
        // Get the stripeTransaction
        restStripeTransactionMockMvc.perform(get("/api/stripe-transactions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStripeTransaction() throws Exception {
        // Initialize the database
        stripeTransactionRepository.saveAndFlush(stripeTransaction);

        int databaseSizeBeforeUpdate = stripeTransactionRepository.findAll().size();

        // Update the stripeTransaction
        StripeTransaction updatedStripeTransaction = stripeTransactionRepository.findById(stripeTransaction.getId()).get();
        // Disconnect from session so that the updates on updatedStripeTransaction are not directly saved in db
        em.detach(updatedStripeTransaction);
        updatedStripeTransaction
            .stripResponse(UPDATED_STRIP_RESPONSE);

        restStripeTransactionMockMvc.perform(put("/api/stripe-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStripeTransaction)))
            .andExpect(status().isOk());

        // Validate the StripeTransaction in the database
        List<StripeTransaction> stripeTransactionList = stripeTransactionRepository.findAll();
        assertThat(stripeTransactionList).hasSize(databaseSizeBeforeUpdate);
        StripeTransaction testStripeTransaction = stripeTransactionList.get(stripeTransactionList.size() - 1);
        assertThat(testStripeTransaction.getStripResponse()).isEqualTo(UPDATED_STRIP_RESPONSE);
    }

    @Test
    @Transactional
    public void updateNonExistingStripeTransaction() throws Exception {
        int databaseSizeBeforeUpdate = stripeTransactionRepository.findAll().size();

        // Create the StripeTransaction

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStripeTransactionMockMvc.perform(put("/api/stripe-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stripeTransaction)))
            .andExpect(status().isBadRequest());

        // Validate the StripeTransaction in the database
        List<StripeTransaction> stripeTransactionList = stripeTransactionRepository.findAll();
        assertThat(stripeTransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStripeTransaction() throws Exception {
        // Initialize the database
        stripeTransactionRepository.saveAndFlush(stripeTransaction);

        int databaseSizeBeforeDelete = stripeTransactionRepository.findAll().size();

        // Get the stripeTransaction
        restStripeTransactionMockMvc.perform(delete("/api/stripe-transactions/{id}", stripeTransaction.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<StripeTransaction> stripeTransactionList = stripeTransactionRepository.findAll();
        assertThat(stripeTransactionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StripeTransaction.class);
        StripeTransaction stripeTransaction1 = new StripeTransaction();
        stripeTransaction1.setId(1L);
        StripeTransaction stripeTransaction2 = new StripeTransaction();
        stripeTransaction2.setId(stripeTransaction1.getId());
        assertThat(stripeTransaction1).isEqualTo(stripeTransaction2);
        stripeTransaction2.setId(2L);
        assertThat(stripeTransaction1).isNotEqualTo(stripeTransaction2);
        stripeTransaction1.setId(null);
        assertThat(stripeTransaction1).isNotEqualTo(stripeTransaction2);
    }
}

package com.elearning.com.apps.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.elearning.com.apps.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.Student.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.Teacher.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.Address.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.State.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.State.class.getName() + ".cities", jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.City.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.Course.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.PlayList.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.Quiz.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.QuizAns.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.Article.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.Education.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.EducationCollege.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.EducationCollege.class.getName() + ".students", jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.EducationCollege.class.getName() + ".teachers", jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.Gallery.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.GalleryGroup.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.GalleryGroup.class.getName() + ".galleries", jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.Services.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.Offer.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.Jobs.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.TaxRate.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.StripeCustomer.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.StripePayment.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.StripeTransaction.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.CardExpiryReminder.class.getName(), jcacheConfiguration);
            cm.createCache(com.elearning.com.apps.domain.UserSignUpByReferralCode.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}

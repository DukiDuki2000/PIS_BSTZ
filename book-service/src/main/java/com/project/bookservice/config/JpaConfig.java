package com.project.bookservice.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = "com.project.bookservice.repositories.jpa")
public class JpaConfig {
}

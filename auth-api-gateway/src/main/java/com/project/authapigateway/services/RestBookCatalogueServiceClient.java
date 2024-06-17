package com.project.authapigateway.services;

import com.project.authapigateway.models.bookservice.BookCategory;
import com.project.authapigateway.models.bookservice.BookDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Service
public class RestBookCatalogueServiceClient {
    private static final Logger log = LoggerFactory.getLogger(RestBookCatalogueServiceClient.class);
    private final RestClient restClient;

    RestBookCatalogueServiceClient(@Value("${services.book-service}") String bookCatalogueUrl) {
        this.restClient = RestClient.create(bookCatalogueUrl);
    }

    public List<BookDto> findAll() {
        return restClient.get()
                .uri("book/all")
                .retrieve()
                .body(new ParameterizedTypeReference<>() {});
    }

    public List<BookDto> getBookByCategory(BookCategory category) {
        return restClient.get()
                .uri("book/category/{category}", category)
                .retrieve()
                .body(new ParameterizedTypeReference<>() {});
    }
}

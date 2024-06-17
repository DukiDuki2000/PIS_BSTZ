package com.project.bookservice.controllers;

import com.project.bookservice.models.Book.EBook;
import com.project.bookservice.services.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.io.IOException;
import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    private static final Logger logger = Logger.getLogger(SearchController.class.getName());

    @Autowired
    private SearchService searchService;

    @GetMapping("/health")
    public String checkHealth() {
        return searchService.checkElasticsearchConnection();
    }

    @GetMapping
    public ResponseEntity<List<EBook>> searchBooks(@RequestParam String term) {
        logger.info("Search term: " + term);
        List<EBook> results = searchService.searchBooks(term);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }
}

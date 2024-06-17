package com.project.authapigateway.controllers;

import com.project.authapigateway.models.bookservice.BookCategory;
import com.project.authapigateway.models.bookservice.BookDto;
import com.project.authapigateway.services.RestBookCatalogueServiceClient;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/book")
@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
public class BookRestController {
    private final RestBookCatalogueServiceClient bookCatalogueServiceClient;

    public BookRestController(RestBookCatalogueServiceClient bookCatalogueServiceClient) {
        this.bookCatalogueServiceClient = bookCatalogueServiceClient;
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<BookDto> getAllBooks() {
        return bookCatalogueServiceClient.findAll();
    }

    @GetMapping("/category/{category}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<BookDto> getBookByCategory(@PathVariable String category)
    {
        return bookCatalogueServiceClient.getBookByCategory(BookCategory.valueOf(category.toUpperCase()));
    }

}

package com.project.authapigateway.models.bookservice;

public record BookDto(Long id, String title, String author, String isbn,
                      Integer amount, BookCategory category) { }

package com.project.bookservice.repositories.jpa;

import com.project.bookservice.models.Book.Book;
import com.project.bookservice.models.Book.BookCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByTitleAndAuthor(String title, String author);
    Optional<Book> findById(Long id);
    Book findBookById(Long id);
    List<Book>findByCategory(BookCategory category);
    Optional<Book> findByIsbn(String isbn);
    //Book findByTitleAndAuthorAndIsbnAndPublisherAndPublishedDate(String title, String author, String isbn, String publisher, Date publishedDate, BookCategory category);
}

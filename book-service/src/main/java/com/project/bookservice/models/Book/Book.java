package com.project.bookservice.models.Book;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Table(name = "Books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "Title")
    private String title;

    @Column(name = "Author")
    private String author;

    @Column(name = "ISBN")
    private String isbn;

    @Column(name = "Publisher")
    private String publisher;

    @Column(name = "PublishedDate")
    private Date publishedDate;

    @Column(name = "Description")
    private String description;

    @Column(name = "Category")
    @Enumerated(EnumType.STRING)
    private BookCategory category;

    @Column(name = "Amount")
    private Integer amount;

    public Book(String title, String author, String isbn, String publisher, Date publishedDate, BookCategory category) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.publisher = publisher;
        this.publishedDate = publishedDate;
        this.category = category;
    }
}

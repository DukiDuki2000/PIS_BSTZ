package com.project.bookservice.models.Book;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
@Document(indexName = "books-connector")
public class EBook {

    @Id
    @Field(type = FieldType.Keyword)
    private String id;

    @Field(type = FieldType.Text)
    @JsonProperty("public_books_title")
    private String title;

    @Field(type = FieldType.Text)
    @JsonProperty("public_books_author")
    private String author;

    @Field(type = FieldType.Text)
    @JsonProperty("public_books_isbn")
    private String isbn;

    @Field(type = FieldType.Text)
    @JsonProperty("public_books_publisher")
    private String publisher;

    @Field(type = FieldType.Date)
    @JsonProperty("public_books_published_date")
    private Date publishedDate;

    @Field(type = FieldType.Text)
    @JsonProperty("public_books_description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Field(type = FieldType.Keyword)
    @JsonProperty("public_books_category")
    private BookCategory category;

    @Enumerated(EnumType.STRING)
    @Field(type = FieldType.Keyword)
    @JsonProperty("public_books_status")
    private BookStatus status;

    public void available() {
        this.status = BookStatus.AVAILABLE;
    }

    public void unavailable() {
        this.status = BookStatus.UNAVAILABLE;
    }

    public void ordered() {
        this.status = BookStatus.ORDERED;
    }

    public void borrowed() {
        this.status = BookStatus.BORROWED;
    }
}

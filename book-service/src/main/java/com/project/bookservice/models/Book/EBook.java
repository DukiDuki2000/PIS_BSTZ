package com.project.bookservice.models.Book;

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
@Document(indexName = "postgresql1")
public class EBook {

    @Id
    @Field(type = FieldType.Keyword)
    private String id;

    @Field(type = FieldType.Text)
    private String title;

    @Field(type = FieldType.Text)
    private String author;

    @Field(type = FieldType.Text)
    private String isbn;

    @Field(type = FieldType.Text)
    private String publisher;

    @Field(type = FieldType.Date)
    private Date publishedDate;

    @Field(type = FieldType.Text)
    private String description;

    @Enumerated(EnumType.STRING)
    @Field(type = FieldType.Keyword)
    private BookCategory category;

    @Enumerated(EnumType.STRING)
    @Field(type = FieldType.Keyword)
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

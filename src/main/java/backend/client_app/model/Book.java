package backend.client_app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.Objects;

@Data
@Entity
@Table(name="Books")
public class Book {

    private @Id
    @GeneratedValue Long id;
    private String title;
    private String author_name;
    private String author_surname;
    private String category;

    public Book() {}

    public Book(String title, String author_name, String author_surname, String category) {
        this.title = title;
        this.author_name = author_name;
        this.author_surname = author_surname;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor_name() {
        return author_name;
    }

    public void setAuthor_name(String author_name) {
        this.author_name = author_name;
    }

    public String getAuthor_surname() {
        return author_surname;
    }

    public void setAuthor_surname(String author_surname) {
        this.author_surname = author_surname;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Book book)) return false;
        return Objects.equals(id, book.id) && Objects.equals(title, book.title) && Objects.equals(author_name, book.author_name) && Objects.equals(author_surname, book.author_surname) && Objects.equals(category, book.category);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, author_name, author_surname, category);
    }

    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", author_name='" + author_name + '\'' +
                ", author_surname='" + author_surname + '\'' +
                ", category='" + category + '\'' +
                '}';
    }
}

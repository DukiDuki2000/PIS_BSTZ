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
    private String authorName;
    private String authorSurname;
    private String category;

    public Book() {}

    public Book(String title, String authorName, String authorSurname, String category) {
        this.title = title;
        this.authorName = authorName;
        this.authorSurname = authorSurname;
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

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String author_name) {
        this.authorName = author_name;
    }

    public String getAuthorSurname() {
        return authorSurname;
    }

    public void setAuthorSurname(String author_surname) {
        this.authorSurname = author_surname;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Book book)) return false;
        return Objects.equals(id, book.id) && Objects.equals(title, book.title) && Objects.equals(authorName, book.authorName) && Objects.equals(authorSurname, book.authorSurname) && Objects.equals(category, book.category);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, authorName, authorSurname, category);
    }

    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", author_name='" + authorName + '\'' +
                ", author_surname='" + authorSurname + '\'' +
                ", category='" + category + '\'' +
                '}';
    }
}

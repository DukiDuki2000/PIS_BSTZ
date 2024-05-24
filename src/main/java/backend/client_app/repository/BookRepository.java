package backend.client_app.repository;

import backend.client_app.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface BookRepository extends JpaRepository<Book, Long> {

    @Query("SELECT distinct b.category from Book b")
    List<String> findAllCategories();

    @Query("select distinct concat(b.authorName, ' ', b.authorSurname) from Book b")
    List<String> findAllAuthors();

    @Query("SELECT b FROM Book b WHERE b.authorName = :authorName AND b.authorSurname = :authorSurname")
    List<Book> findBookByAuthor(String authorName, String authorSurname);
}

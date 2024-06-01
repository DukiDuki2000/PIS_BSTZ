package backend.client_app.service;

import backend.client_app.model.Book;
import backend.client_app.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getAllBooks(String sortBy, String sortOrder) {
        Sort sort = Sort.by(Sort.Direction.ASC, sortBy != null ? sortBy : "title");
        if ("desc".equalsIgnoreCase(sortOrder)) {
            sort = sort.descending();
        }
        return bookRepository.findAll(sort);
    }
}

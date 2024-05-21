package backend.client_app.controller;

import backend.client_app.model.Book;
import backend.client_app.repository.BookRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
class BookController {

    private final BookRepository bookRepository;

    public BookController(BookRepository bookRepository){
        this.bookRepository = bookRepository;
    }

    @GetMapping("/books")
    List<Book> all(){
        return bookRepository.findAll();
    }

    @GetMapping("/book/{id}")
    Book getOne(@PathVariable Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No such a book"));
    }

    @PostMapping("/book/add")
    Book addBook(@RequestBody Book newBook) {
        return bookRepository.save(newBook);
    }

    @PostMapping("/books/add")
    public List<Book> addBooks(@RequestBody List<Book> newBooks) {
        return bookRepository.saveAll(newBooks);
    }

    @DeleteMapping("/books/{id}")
    void deleteBook(@PathVariable Long id) {
        bookRepository.deleteById(id);
    }
}

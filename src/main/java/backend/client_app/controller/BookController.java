package backend.client_app.controller;

import backend.client_app.model.Book;
import backend.client_app.repository.BookRepository;
import backend.client_app.service.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
class BookController {

    private final BookRepository bookRepository;
    private final BookService bookService;

    public BookController(BookRepository bookRepository, BookService bookService){
        this.bookRepository = bookRepository;
        this.bookService = bookService;
    }

    @GetMapping("/books")
    public List<Book> getAllBooks(
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortOrder)
    {
        return bookService.getAllBooks(sortBy, sortOrder);
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

    @GetMapping("/categories")
    public List<String> getCategories() {
        return bookRepository.findAllCategories();
    }

    @GetMapping("/authors")
    public List<String> getAuthors() {
        return bookRepository.findAllAuthors();
    }

    @GetMapping("/books/author")
    public List<Book> getBooksByAuthor(@RequestParam("author_name") String authorName, @RequestParam("author_surname") String authorSurname) {
        return bookRepository.findBookByAuthor(authorName, authorSurname);
    }
}

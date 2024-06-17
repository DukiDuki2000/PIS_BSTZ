package com.project.bookservice.controllers;

import com.project.bookservice.models.Book.Book;
import com.project.bookservice.models.Book.BookCategory;
import com.project.bookservice.models.Log.Log;
import com.project.bookservice.services.BookService1;
import com.project.bookservice.services.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/book")
public class BookRestController {

    private final BookService1 bookService;
    @Autowired
    public BookRestController(BookService1 bookService) {
        this.bookService = bookService;
    }

    @Autowired
    private LogService logService;


    @GetMapping("/all")
    public List<Book> getAllBooks(
        @RequestParam(required = false) String sortBy,
        @RequestParam(required = false) String sortOrder)
    {
        logService.log("Zapytano o liste ksiazek","");
        return bookService.getAllBooks(sortBy, sortOrder);
    }

    @PostMapping("/add")
    Book addBook(@RequestBody Book newBook) {
        logService.log("Added", newBook);
        Log log = new Log("Dodano książkę", newBook.getTitle()+" "+newBook.getAuthor()+" "+newBook.getIsbn());
        return bookService.add(newBook);
    }

    @GetMapping("/category/{category}")
    public List<Book> getBookByParam(
            @PathVariable BookCategory category)
    {
        return bookService.getBooksByCategory(category);
    }


}

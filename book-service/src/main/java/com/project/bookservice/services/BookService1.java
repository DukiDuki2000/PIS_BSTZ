package com.project.bookservice.services;

import com.project.bookservice.models.Book.Book;
import com.project.bookservice.models.Book.BookCategory;
import com.project.bookservice.repositories.jpa.BookRepository;

import com.project.schemas.LoanFailEvent;
import com.project.schemas.LoanSuccesEvent;
import com.project.schemas.RequestLoanBookCommand;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class BookService1 {

    @Autowired
    private BookRepository bookRepository;


    public List<Book> getAllBooks(String sortBy, String sortOrder) {
        Sort sort = Sort.by(Sort.Direction.ASC, sortBy != null ? sortBy : "title");
        if ("desc".equalsIgnoreCase(sortOrder)) {
            sort = sort.descending();
        }
        return bookRepository.findAll(sort);
    }

    public Book add(Book newbook) {
        Optional<Book> existingBookOpt = bookRepository.findByIsbn(newbook.getIsbn());
        if (existingBookOpt.isPresent()) {
            Book existingBook = existingBookOpt.get();
            existingBook.setAmount(existingBook.getAmount()+1);
            return bookRepository.save(existingBook);
        } else {
            newbook.setAmount(1);
            return bookRepository.save(newbook);
        }
    }



    public boolean checkAvailability(Long bookId) {
        Optional<Book> book = bookRepository.findById(bookId);
        if (book.isPresent()) {
            return (book.get().getAmount() > 0);
        } else {
            return false;
        }
    }


    public List<Book> getBooksByCategory( BookCategory category) {
        return bookRepository.findByCategory(category);
    }

    @Autowired
    private KafkaTemplate<String, LoanSuccesEvent> loanSuccesEventKafkaTemplate;
    private @Value("${spring.kafka.topics.loan-succes}") String loanSuccesEventTopic;

    public void LoanSucces(RequestLoanBookCommand command) {
        Book book = bookRepository.findBookById(command.bookId());
        book.setAmount(book.getAmount()-1);
        loanSuccesEventKafkaTemplate.send(loanSuccesEventTopic, command.asLoanSucces(book.getTitle(), book.getAuthor()));
    }

    @Autowired
    private KafkaTemplate<String, LoanFailEvent> loanFailEventKafkaTemplate;
    private @Value("${spring.kafka.topics.loan-fail}") String loanFailEventTopic;

    public void LoanFail(RequestLoanBookCommand command) {
        loanFailEventKafkaTemplate.send(loanFailEventTopic, command.asLoanFail());
    }


}

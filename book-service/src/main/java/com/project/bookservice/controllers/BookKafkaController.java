package com.project.bookservice.controllers;

import com.project.schemas.ChangeLoanStatusEvent;
import com.project.schemas.RequestLoanBookCommand;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import com.project.bookservice.services.BookService1;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class BookKafkaController {

    @Autowired
    BookService1 bookService;

    @KafkaListener(topics = "${spring.kafka.topics.loan-book}",
            groupId = "book-service",
            containerFactory = "loanBookCommandKafkaListenerContainerFactory")
    public void handleLoanBookCommand(RequestLoanBookCommand command) {
        log.info("nazwa"+command);
        if(bookService.checkAvailability(command.bookId())){
            bookService.LoanSucces(command);
        } else {
            bookService.LoanFail(command);
        }
    }

}
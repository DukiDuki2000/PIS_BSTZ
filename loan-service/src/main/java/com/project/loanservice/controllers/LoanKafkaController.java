package com.project.loanservice.controllers;
import com.project.loanservice.models.Loan.Loan;
import com.project.loanservice.models.Loan.Log;
import com.project.loanservice.services.LoanService;
import com.project.loanservice.repositories.LoanRepository;
import com.project.schemas.LoanFailEvent;
import com.project.schemas.LoanSuccesEvent;
import com.project.schemas.RequestLoanBookCommand;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

@Component
@Slf4j
public class LoanKafkaController {
    private final KafkaTemplate<String, RequestLoanBookCommand> requestLoanBookCommandKafkaTemplate;
    private final String loanBookCommandTopic;
    private final LoanRepository loanRepository;
    private final LoanService loanService;

    public LoanKafkaController(LoanService loanService,
                               LoanRepository loanRepository,
                               @Value("${spring.kafka.topics.loan-book}") String loanBookCommandTopic,
                               KafkaTemplate<String, RequestLoanBookCommand> requestLoanBookCommandKafkaTemplate) {
        this.loanService = loanService;
        this.loanRepository = loanRepository;
        this.loanBookCommandTopic = loanBookCommandTopic;
        this.requestLoanBookCommandKafkaTemplate = requestLoanBookCommandKafkaTemplate;
    }


    @KafkaListener(topics = "${spring.kafka.topics.request-loan-book}",
            groupId = "loan-service",
            containerFactory = "loanBookEventKafkaListenerContainerFactory")
    public void listen(RequestLoanBookCommand command) {
        log.info("" + command);
        requestLoanBookCommandKafkaTemplate.send(loanBookCommandTopic, command);
    }

    @KafkaListener(topics = "${spring.kafka.topics.loan-succes}",
            groupId = "loan-service",
            containerFactory = "loanBookEventSuccesKafkaListenerContainerFactory")
    public Loan listen_succes(LoanSuccesEvent command) {
        log.info("Succes" + command);
        Loan loan = new Loan();
        loan.setBookId(command.bookId());
        loan.setUserId(command.userId());
        loan.setEmail(command.email());
        loan.setCreationDate(Calendar.getInstance().getTime());
        Log log = new Log("Utworzono wypozyczenie", command.bookId().toString()+command.userId().toString()+command.email());
        return loanRepository.save(loan);
    }

    @KafkaListener(topics = "${spring.kafka.topics.loan-fail}",
            groupId = "loan-service",
            containerFactory = "loanBookEventFailKafkaListenerContainerFactory")
    public void listen_fail(LoanFailEvent command) {
        log.info("Fail" + command);


    }
}
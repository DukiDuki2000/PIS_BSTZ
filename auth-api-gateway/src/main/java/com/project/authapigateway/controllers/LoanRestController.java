package com.project.authapigateway.controllers;


import com.project.authapigateway.models.loanservice.LoanCommand;
import com.project.authapigateway.models.loanservice.LoanDto;
import com.project.authapigateway.services.RestLoanServiceClient;
import com.project.schemas.RequestLoanBookCommand;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/loan")
@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
public class LoanRestController {
    private final RestLoanServiceClient restLoanServiceClient;
    private final KafkaTemplate<String, RequestLoanBookCommand> loanBookCommandKafkaTemplate;
    private final String loanBookCommandTopic;

    public LoanRestController(RestLoanServiceClient restLoanServiceClient,
                              @Value("${spring.kafka.topics.request-loan-book}") String requestloanBookCommandTopic,
                              KafkaTemplate<String, RequestLoanBookCommand> requestloanBookCommandKafkaTemplate) {
        this.restLoanServiceClient = restLoanServiceClient;
        this.loanBookCommandTopic = requestloanBookCommandTopic;
        this.loanBookCommandKafkaTemplate = requestloanBookCommandKafkaTemplate;
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<LoanDto> getAllLoans() {
        return restLoanServiceClient.getModAllLoans();
    }

    @GetMapping("/{userId}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<LoanDto> getAllLoans(@PathVariable Long userId) {
        return restLoanServiceClient.getUserAllLoans(userId);
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('User')")
    public void createLoan(@RequestBody LoanCommand loanCommand) {
        RequestLoanBookCommand command = RequestLoanBookCommand.create(loanCommand.userId(), loanCommand.email(), loanCommand.bookId());
        loanBookCommandKafkaTemplate.send(loanBookCommandTopic, command);
    }
}

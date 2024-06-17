package com.project.loanservice.services;

import com.project.loanservice.models.Loan.Loan;
import com.project.loanservice.repositories.LoanRepository;
import com.project.schemas.AddBookCommand;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


import java.util.Calendar;
import java.util.List;

@Service
public class LoanService {

    private final LoanRepository loanRepository;

    @Autowired
    private LogService logService;

    @Autowired
    public LoanService(LoanRepository loanRepository) {
        this.loanRepository = loanRepository;

    }

    @Transactional
    public Loan processNewLoan(AddBookCommand command) {
        Loan loan = new Loan();
        loan.setTitle(command.title());
        loan.setAuthor(command.author());
        loan.setLoanDate(Calendar.getInstance().getTime());
        loan.setUserId(6L);
        logService.log("Wypozyczono", command);
        return loanRepository.save(loan);
    }

    public List<Loan> getAllLoans(String sortBy, String sortOrder) {
        Sort sort;
        if (sortBy == null || sortBy.isEmpty()) {
            sort = Sort.by(Sort.Direction.ASC, "title"); // Default sorting by "title" ascending
        } else {
            if (sortOrder != null && sortOrder.equalsIgnoreCase("desc")) {
                sort = Sort.by(Sort.Direction.DESC, sortBy);
            } else {
                sort = Sort.by(Sort.Direction.ASC, sortBy);
            }
        }
        return loanRepository.findAll(sort);
    }

    public List<Loan> getLoansByUser(Long userId, String sortBy, String sortOrder) {
        Sort sort = Sort.by(Sort.Direction.ASC, (sortBy != null ? sortBy : "creationDate"));
        if ("desc".equalsIgnoreCase(sortOrder)) {
            sort = sort.descending();
        }
        return loanRepository.findByUserId(userId, sort);
    }

//    @Transactional
//    public Loan acceptLoan(Long loanId) {
//        Loan loan = loanRepository.findById(loanId).orElseThrow(() -> new RuntimeException("Loan not found"));
//        loan.setLoanAccept(true);
//        logService.log("Accepted", loan);
//        return loanRepository.save(loan);
//    }
//    @Autowired
//    private KafkaTemplate<String, LoanBookCommand> kafkaTemplate;
//
//    @Value("${spring.kafka.topics.loanBookCommand}")
//    private String loanBookCommandTopic;
//
//    public void checkBookAvailability(String title, String author) {
//        LoanBookCommand command = LoanBookCommand.create(title, author);
//        kafkaTemplate.send(loanBookCommandTopic, command);
//    }

}

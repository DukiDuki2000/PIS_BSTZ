package com.project.loanservice.controllers;

import com.project.loanservice.models.Loan.Loan;
import com.project.loanservice.services.LoanService;
import com.project.loanservice.services.LogService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Book;
import java.util.List;
@Slf4j
@RestController
@RequestMapping("/loan")
public class LoanRestController {


    @Autowired
    private LogService logService;

    private final LoanService loanService;

    public LoanRestController(LoanService loanService) {
        this.loanService = loanService;
    }

    @GetMapping("/all")
    public List<Loan> getAllLoans(
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortOrder) {
        return loanService.getAllLoans(sortBy, sortOrder);
    }

    @GetMapping("/{userId}")
    public List<Loan> getLoansByUser(
            @PathVariable Long userId,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortOrder) {
        return loanService.getLoansByUser(userId, sortBy, sortOrder);
    }
}

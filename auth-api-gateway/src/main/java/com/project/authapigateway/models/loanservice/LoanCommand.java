package com.project.authapigateway.models.loanservice;

public record LoanCommand(Long userId, String email, Long bookId ) {
}

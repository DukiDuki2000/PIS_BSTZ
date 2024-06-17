package com.project.loanservice.repositories;

import com.project.loanservice.models.Loan.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Sort;
import java.util.List;

public interface LoanRepository extends JpaRepository<Loan, Long> {
    List<Loan> findByUserId(Long userId, Sort sort);
}


package com.project.loanservice.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.project.loanservice.models.Loan.Log;
public interface LogRepository extends MongoRepository<Log,String> {
}

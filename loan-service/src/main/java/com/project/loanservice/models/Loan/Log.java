package com.project.loanservice.models.Loan;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Log {
    @Id
    private String id;
    private Date timestamp;
    private String message;
    private String details;

    public Log(String message, String details) {
        this.timestamp = new Date();
        this.message = message;
        this.details = details;
    }
}
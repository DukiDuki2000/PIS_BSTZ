package com.project.authapigateway.models.loanservice;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public record LoanDto(Long userId, String title,
                      String author, @JsonFormat(pattern = "yyy-MM-dd", timezone = "Europe/Warsaw") Date creationDate) { }
